import React, { useState } from "react";
import "../../styles/dashboard_styles/barra_superior.css";
import Notificacao from "../../assets/notificacao.png";
import Pesquisa from "../../assets/pesquisa.png";

const BarraSuperior = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
    setShowProfile(false);
  };
  const toggleProfile = () => {
    setShowProfile(prev => !prev);
    setShowNotifications(false);
  };

  return (
    <div className="barra-superior">
      <div className="search-section">
        <img src={Pesquisa} alt="Pesquisar" className="search-icon" />
        <input
          type="text"
          placeholder="Pesquisar"
          className="search-input"
        />
      </div>
      <div className="right-section">
        <img src={Notificacao} alt="Notificações" className="bell-icon" onClick={toggleNotifications} />
        {showNotifications && (
          <div className={`notifications-dropdown ${showNotifications ? 'show' : ''}`}>
            <p>Sem notificações no momento</p>
          </div>
        )}
        <div className="user-avatar" onClick={toggleProfile}>U</div>
        {showProfile && (
          <div className={`profile-dropdown ${showProfile ? 'show' : ''}`}>
            <a href="/profile">Ver Perfil</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarraSuperior;
