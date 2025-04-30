import React from "react";
import { useState, useEffect } from "react";
import './TeamInfo.css';

function TeamInfo() {
    // Simulated match data
    const [nextMatch, setNextMatch] = useState({
        opponent: "NAVI",
        tournament: "IEM Dallas 2025",
        date: "2025-05-15",
        time: "19:00",
        stage: "Semifinal"
    });

    // Current roster data
    const currentRoster = [
        { name: "arT", role: "IGL/Rifler", country: "🇧🇷" },
        { name: "KSCERATO", role: "Rifler", country: "🇧🇷" },
        { name: "yuurih", role: "Rifler", country: "🇧🇷" },
        { name: "molodoy", role: "AWPer", country: "🇰🇿" },
        { name: "YEKINDAR", role: "Stand-in", country: "🇱🇻" }
    ];

    // Format date to be more readable
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    return (
        <div className="team-info-container">
            {/* Main content would go here */}
            
            {/* Footer */}
            <footer className="team-info-footer">
                <div className="next-match">
                    <h3>Próximo Jogo</h3>
                    <div className="match-details">
                        <span className="match-teams">FURIA vs {nextMatch.opponent}</span>
                        <span className="match-tournament">{nextMatch.tournament}</span>
                        <span className="match-stage">{nextMatch.stage}</span>
                        <span className="match-date-time">
                            {formatDate(nextMatch.date)} às {nextMatch.time}
                        </span>
                    </div>
                </div>
                
                <div className="current-roster">
                    <h3>Elenco Atual</h3>
                    <div className="roster-players">
                        {currentRoster.map((player, index) => (
                            <div key={index} className="player-card">
                                <span className="player-name">{player.name} {player.country}</span>
                                <span className="player-role">{player.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default TeamInfo;