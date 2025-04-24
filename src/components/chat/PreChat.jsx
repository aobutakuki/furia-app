import React from "react";
import { useState, useEffect } from "react";

function PreChat({onSubmit,onClose}){

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        csPlaytime: '',
        csFavouritePlayer: ''
      });
      const [errors, setErrors] = useState({});

      const validate = () => {
        if(formData.name.trim() === '') {
          setErrors(prevErrors => ({ ...prevErrors, name: 'Name is required' }));
          return false;
        }
        if(formData.age.trim() === '') {
          setErrors(prevErrors => ({ ...prevErrors, age: 'Age is required' }));
          return false;
        }
        if(formData.csPlaytime.trim() === '') {
          setErrors(prevErrors => ({ ...prevErrors, csPlaytime: 'CS Playtime is required' }));
          return false;
        }
        if(!formData.csFavouritePlayer) {
          setErrors(prevErrors => ({ ...prevErrors, csFavouritePlayer: 'Please select a favourite player' }));
          return false;
        }
        return true;

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          onSubmit(formData);
        }
      };

    return (
        <div className="popup-overlay">
            <div className="popup-content animated-fade-in">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Bem vindo ao chat!</h2>
                <p>Antes de comecar nos conte um pouco sobre voce!</p>

                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${errors.name ? 'error' : ''}`}>
                        <label>Your Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Enter your name"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    <div className={`form-group ${errors.age ? 'error' : ''}`}>
                        <label>Your Age:</label>
                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            placeholder="Enter your age"
                        />
                        {errors.age && <span className="error-message">{errors.age}</span>}
                    </div>
                    <div className={`form-group ${errors.csPlaytime ? 'error' : ''}`}>
                        <label>CS Playtime:</label>
                        <input
                            type="text"
                            name="csPlaytime"
                            value={formData.csPlaytime}
                            placeholder="Enter your CS playtime"
                        />
                        {errors.csPlaytime && <span className="error-message">{errors.csPlaytime}</span>}
                    </div>
                    <div className={`form-group ${errors.csFavouritePlayer ? 'error' : ''}`}>
                        <label>CS Favourite Player:</label>
                        <select
                            name="csFavouritePlayer"
                            value={formData.csFavouritePlayer}
                        >
                            <option value="">Nao tenho um jogador favorito</option>
                            <option value="player1">Player 1</option>
                            <option value="player2">Player 2</option>
                            <option value="player3">Player 3</option>
                            <option value="player4">Player 4</option>
                            <option value="player5">Player 5</option>
                        </select>
                        {errors.csFavouritePlayer && <span className="error-message">{errors.csFavouritePlayer}</span>}
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="primary-button">
                            Start Chatting
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )

}



export default PreChat;