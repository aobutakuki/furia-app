from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uuid
from datetime import datetime
from chatbot import generate_response, analyze_interests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity; adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("user_data", exist_ok=True)


class Message(BaseModel):
    user_id: str = None
    text: str

@app.post("/chat")
async def chat(message: Message):
    if not message.user_id:
        message.user_id = str(uuid.uuid4())

        response_text = generate_response(message.text)
        interests = analyze_interests(message.text)

        if interests:
            update_user_data(message.user_id, interests)

            return{
                "response": response_text,
                "user_id": message.user_id
            }
        
@app.get("/user_data/{user_id}.txt")
async def get_user_data(user_id: str):
    file_path = os.path.join("user_data", f"{user_id}.txt")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="User data not found")

    with open(file_path, "r") as file:
        data = file.read()

    return {"user_id": user_id, "data": data}

def update_user_data(user_id: str, interests: list):
    file_path = os.path.join("user_data", f"{user_id}.txt")
    with open(file_path, "a") as file:
        file.write(f"Interests: {', '.join(interests)}\n")
        file.write(f"Timestamp: {datetime.now()}\n\n")

def get_user_interests(user_id: str):
    file_path = os.path.join("user_data", f"{user_id}.txt")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="User data not found")

    with open(file_path, "r") as file:
        data = file.readlines()

    interests = []
    for line in data:
        if line.startswith("Interests:"):
            interests.append(line.split(":")[1].strip())

    return interests