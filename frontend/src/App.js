import logo from './logo.svg';
import React from 'react';
import Header from './components/header/Header.jsx';
import Chat from './components/chat/Chat.jsx';
import TeamInfo from './components/team_info/TeamInfo.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Chat/>
      <TeamInfo/>
    </div>
  );
}

export default App;
