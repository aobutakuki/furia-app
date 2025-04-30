import React from "react";
import { useState, useEffect } from "react";

import PreChat from "./PreChat";

import './Chat.css';

function Chat() {
    const [showForm, setShowForm] = useState(true);
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]); 
    const [inputMessage, setInputMessage] = useState(''); 
    const [userId, setUserId] = useState(null); // Store user ID
    const messagesEndRef = React.useRef(null); // Ref to scroll to the bottom of the chat
  
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        //scrollToBottom();
    }, [messages]);

    // Handle form submission
    const handleFormSubmit = (data) => {
        setUserData(data);
        setShowForm(false);
        
        const playerMap = {
            'player0': 'Nao tenho um jogador favorito',
            'player1': 'yuurih',
            'player2': 'KSCERATO',
            'player3': 'FalleN',
            'player4': 'molodoy',
            'player5': 'YEKINDAR'
        };
        
        const favoritePlayerName = playerMap[data.csFavouritePlayer] || 'Nao tenho um jogador favorito';
        

        setMessages(prev => [...prev, {
            text: `Olá ${data.name}! Vi que seu jogador favorito é ${favoritePlayerName}. Como posso te ajudar sobre a FURIA hoje?`,
            sender: 'bot'
        }]);

        setUserData({
            ...data,
            csFavouritePlayer: playerMap[data.csFavouritePlayer]
        });
    };

    // Send message to backend
    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;
        
        // Add user message to chat immediately
        const userMessage = { text: inputMessage, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        
        try {
            // Send to FastAPI backend
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    text: inputMessage,
                    user_id: userId,
                    metadata: userData // Include form data
                })
            });
            
            const data = await response.json();
            
            // Store user ID if this is first response
            if (!userId) setUserId(data.user_id);
            
            console.log('Response from backend:', data);
            // Add bot response
            setMessages(prev => [...prev, {
                text: data.response,
                sender: 'bot'
            }]);
            
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                text: "Desculpe, estou tendo problemas para me conectar. Tente novamente mais tarde!",
                sender: 'bot'
            }]);
        }
    };

    return (
        <div className="chat-container">
            {showForm ? (
                <PreChat 
                    onSubmit={handleFormSubmit}
                    onClose={() => setShowForm(false)}
                />
            ) : (
                <>
                    <div className="chat-header">
                        <h2>FURIA CS2 Assistant</h2>
                        <p>Bem-vindo, {userData.name} | Jogador favorito: {userData.csFavouritePlayer}</p>
                    </div>
                    
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="chat-input">
                        <input 
                            type="text" 
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Pergunte sobre a FURIA..." 
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

