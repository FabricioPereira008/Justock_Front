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
      <div className="secao-pesquisa">
        <img src={Pesquisa} alt="Pesquisar" className="icone-pesquisa" />
        <input
          type="text"
          placeholder="Pesquisar"
          className="entrada-pesquisa"
        />
      </div>
      <div className="secao-direita">
        <img src={Notificacao} alt="Notificações" className="icone-sino" onClick={toggleNotifications} />
        {showNotifications && (
          <div className={`dropdown-notificacoes ${showNotifications ? 'show' : ''}`}>
            <p>Sem notificações no momento</p>
          </div>
        )}
        <div className="avatar-usuario" onClick={toggleProfile}>U</div>
        {showProfile && (
          <div className={`dropdown-perfil ${showProfile ? 'show' : ''}`}>
            <a href="/profile">Ver Perfil</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarraSuperior;
