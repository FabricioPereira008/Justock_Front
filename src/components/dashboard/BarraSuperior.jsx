import React, { useState, useEffect, useRef } from "react";
import "./barra_superior.css";
import Pesquisa from "../../assets/pesquisa.png";
import { FiHelpCircle, FiBell } from "react-icons/fi";
import SuporteModal from "../suporte/SuporteModal";

const BarraSuperior = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openSuporte, setOpenSuporte] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationsCount = notifications.length;

  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
    setShowProfile(false);
  };
  const toggleProfile = () => {
    setShowProfile(prev => !prev);
    setShowNotifications(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
    setShowProfile(false);
  };

  const handleConfirmLogout = () => {
    window.location.href = '/login';
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
        <FiHelpCircle
          className="icone-suporte"
          title="Suporte"
          aria-label="Suporte"
          onClick={() => setOpenSuporte(true)}
        />
        <div ref={notificationsRef} style={{ position: 'relative', display: 'inline-flex' }}>
          <button
            type="button"
            className={`icone-sino ${notificationsCount > 0 ? 'has-unread' : ''}`}
            aria-label="Notificações"
            title="Notificações"
            data-count={notificationsCount}
            onClick={toggleNotifications}
          >
            <FiBell />
          </button>
          {showNotifications && (
            <div className={`dropdown-notificacoes ${showNotifications ? 'show' : ''}`}>
              {notificationsCount > 0 ? (
                <div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {notifications.map((n, idx) => (
                      <li key={idx} style={{ padding: '6px 4px', borderBottom: '1px solid #eee' }}>{n}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    style={{ marginTop: '8px', width: '100%', background: '#f5f5f5', border: '1px solid #ddd', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => setNotifications([])}
                  >
                    Limpar notificações
                  </button>
                </div>
              ) : (
                <p>Sem notificações no momento</p>
              )}
            </div>
          )}
        </div>

        <div ref={profileRef} style={{ position: 'relative', display: 'inline-flex' }}>
          <div className="avatar-usuario" onClick={toggleProfile}>U</div>
          {showProfile && (
            <div className={`dropdown-perfil ${showProfile ? 'show' : ''}`}>
              <a href="/profile">Ver Perfil</a>
              <a href="#" onClick={handleLogout}>Sair</a>
            </div>
          )}
        </div>
      </div>
      <SuporteModal open={openSuporte} onClose={() => setOpenSuporte(false)} />
      {showLogoutModal && (
        <div className="modal-sobreposicao">
          <div className="modal-conteudo">
            <p>Tem certeza que quer sair da conta?</p>
            <div className="modal-botoes">
              <button className="btn-nao" onClick={handleCancelLogout}>NÃO</button>
              <button className="btn-sim" onClick={handleConfirmLogout}>SIM</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarraSuperior;
