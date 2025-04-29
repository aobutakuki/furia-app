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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("user_data", exist_ok=True)

class Message(BaseModel):
    text: str
    user_id: str = None

@app.post("/chat")
async def chat(message: Message):
    if not message.user_id:
        message.user_id = str(uuid.uuid4())
    
    response_text = generate_response(message.text)
    interests = analyze_interests(message.text)
    
    if interests:
        update_user_data(message.user_id, interests)
    
    return {
        "response": response_text,
        "user_id": message.user_id
    }

def update_user_data(user_id: str, interests: list):
    file_path = f"user_data/{user_id}.txt"
    with open(file_path, "a") as f:
        f.write(f"{datetime.now()}: {', '.join(interests)}\n")

@app.get("/user/{user_id}/interests")
async def get_interests(user_id: str):
    file_path = f"user_data/{user_id}.txt"
    if not os.path.exists(file_path):
        return {"interests": []}
    
    with open(file_path, "r") as f:
        return {"interests": [line.strip() for line in f.readlines()]}