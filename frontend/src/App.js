import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Analytics from './components/analytics/Analytics.jsx';
import React from 'react';
import Header from './components/header/Header.jsx';
import Chat from './components/chat/Chat.jsx';
import TeamInfo from './components/team_info/TeamInfo.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Chat />
              <TeamInfo />
            </>
          } />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
