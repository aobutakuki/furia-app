import logo from './logo.svg';
import React from 'react';
import Header from './components/header/Header.jsx';
import Chat from './components/chat/Chat.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Chat/>
    </div>
  );
}

export default App;
