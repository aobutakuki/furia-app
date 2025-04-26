import React from "react";
import { useState, useEffect } from "react";

import PreChat from "./PreChat";

import './Chat.css';

function Chat() {
    const [showForm, setShowForm] = useState(true);
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]); 
    const [inputMessage, setInputMessage] = useState(''); 
  
    // Show user data for demonstration
    const handleFormSubmit = (data) => {
      setUserData(data);
      setShowForm(false);
    };


    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;
        
        // Add user message to chat
        setMessages(prev => [...prev, {
            text: inputMessage,
            sender: 'user'
        }]);
        
        setInputMessage('');
        
        // Simulate bot response (replace with actual API call if needed)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: getBotResponse(inputMessage),
                sender: 'bot'
            }]);
        }, 500);
    };
    
    const getBotResponse = (userMessage) => {
        // Simple response logic - later replace with actual API call
        const lowerMsg = userMessage.toLowerCase();
        if (lowerMsg.includes('olá') || lowerMsg.includes('oi')) return 'Olá! Como posso te ajudar?';
        if (lowerMsg.includes('time')) return 'Você torce para algum time específico?';
        return 'Interessante! Conte-me mais sobre isso.';
    };


return (
    <div className="chat-container">
        {showForm ? (
            <PreChat onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />
        ) : (
            <>
                <div className="chat-header">
                    <h2>Chat Window</h2>
                    <p>Bem vindo, {userData.name}!</p>
                </div>
                
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                
                <div className="chat-input">
                    <input 
                        type="text" 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Digite sua mensagem..." 
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}>Enviar</button>
                </div>
            </>
        )}
    </div>
);
}

export default Chat;

