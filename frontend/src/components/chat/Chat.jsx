import React from "react";
import { useState, useEffect } from "react";

import PreChat from "./PreChat";

import './Chat.css';

function Chat() {
    const [showForm, setShowForm] = useState(true);
    const [userData, setUserData] = useState(null);
  
    const handleFormSubmit = (data) => {
      setUserData(data);
      setShowForm(false);
    };

    return(
        <div className="chat-container">
            {showForm ? (<PreChat onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />) : (
                <div className="chat-window">
                    <h2>Chat Window</h2>
                    <p>Bem vindo, {userData.name}!</p>
                    <p>Your age: {userData.age}</p>
                    <p>Your CS Playtime: {userData.csPlaytime}</p>
                    <p>Your Favourite Player: {userData.csFavouritePlayer}</p>
                </div>
            )}
        </div>
    )
}

export default Chat;

