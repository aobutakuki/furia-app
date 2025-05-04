import React from "react";
import furiaLogo from "../../resources/images/furia-logo.png";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    return (
        <div className="header">
            <div className="header__logo">
                <img src={furiaLogo} alt="FURIA Logo" />
            </div>
            <div className="header__title">
                <h1>FURIA CS2</h1>
                <p className="header__subtitle">Assistente Oficial</p>
            </div>
            <div className="header__icons">
                <div className="icon-container">
                    <FontAwesomeIcon 
                        icon={faComment} 
                        className="icon chat-icon"
                        onClick={() => navigate('/')}
                        title="Chat"
                    />
                    <FontAwesomeIcon 
                        icon={faUser} 
                        className="icon analytics-icon"
                        onClick={() => navigate('/analytics')}
                        title="Analytics"
                    />
                    <FontAwesomeIcon 
                        icon={faGithub} 
                        className="icon github-icon"
                        onClick={() => window.open('https://github.com/aobutakuki/furia-app', '_blank')}
                        title="GitHub"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
