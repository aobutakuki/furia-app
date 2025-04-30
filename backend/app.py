from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uuid
from datetime import datetime
from chatbot import query_furia_assistant, analyze_interests
from typing import Optional, Dict, Any

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
    user_id: Optional[str] = None
    metadata: Optional[dict] = None

@app.post("/chat")
async def chat(message: Message):
    if not message.user_id:
        message.user_id = str(uuid.uuid4())

    print(f"Received message: {message}")
    
    response_text = query_furia_assistant(
        prompt=message.text,
        user_id=message.user_id,
        user_data=message.metadata
    )
    
    interests = analyze_interests(message.text)
    
    if interests:
        update_user_data(message.user_id, interests)
    
    return {
        "response": response_text,
        "user_id": message.user_id,
        "interests": interests  # Added to response
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