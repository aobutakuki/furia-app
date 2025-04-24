import React from "react";
import furiaLogo from "../../resources/images/furia-logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import "./Header.css";
function Header(){
    return(
        <div className= "header">
            <div className="header__logo">
                <img src={furiaLogo} alt="Furia Logo" />
            </div>
            <div className="header__title">
                <h1>Furia</h1>
            </div>
            <div className="header_icons">
            <div className="icon-container">
                    <FontAwesomeIcon icon={faComment} className="icon" />
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <FontAwesomeIcon icon={faGithub} className="icon" />
                </div>
            </div>
        </div>
       
    )
}

export default Header;