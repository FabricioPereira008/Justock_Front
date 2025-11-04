import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./barra_lateral.css";

import logoDetailed from "../../assets/logo_sem.png";
import logoCompact from "../../assets/logo_sem_titulo.png";
import Dashboard from "../../assets/dashboard.png";
import Produtos from "../../assets/produtos.png";
import Pedidos from "../../assets/pedidos.png";
import ConexoesImg from "../../assets/conexoes.png";
import Relatorios from "../../assets/relatorios.png";
import Configs from "../../assets/configs.png";

import { getSidebarPref } from "../../utils/appearance";

const BarraLateral = () => {
  const [isDetailed, setIsDetailed] = useState(() => getSidebarPref() === 'detalhada');

  useEffect(() => {
    const handler = (e) => {
      const mode = e?.detail?.sidebar || getSidebarPref();
      setIsDetailed(mode === 'detalhada');
    };
    window.addEventListener('jt:appearance-updated', handler);
    handler();
    return () => window.removeEventListener('jt:appearance-updated', handler);
  }, []);
  const linkClass = ({ isActive }) => (isActive ? "barra_lateral-item active" : "barra_lateral-item");

  return (
    <nav className="barra_lateral">
      <NavLink to="/dashboard" className="barra_lateral-logo-area">
        <img src={isDetailed ? logoDetailed : logoCompact} alt="Logo Justock" className="barra_lateral-logo-img" />
      </NavLink>

      <ul className="barra_lateral-lista">
        <li>
          <NavLink to="/dashboard" className={linkClass}>
            <img src={Dashboard} alt="Dashboard" title="Dashboard" />
            <span className="barra_lateral-texto">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/produtos" className={linkClass}>
            <img src={Produtos} alt="Produtos" title="Produtos" />
            <span className="barra_lateral-texto">Produtos</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/pedidos" className={linkClass}>
            <img src={Pedidos} alt="Pedidos" title="Pedidos" />
            <span className="barra_lateral-texto">Pedidos</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/conexoes" className={linkClass}>
            <img src={ConexoesImg} alt="Conexoes" title="Conexões" />
            <span className="barra_lateral-texto">Conexões</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/relatorios" className={linkClass}>
            <img src={Relatorios} alt="Relatórios" title="Relatórios" />
            <span className="barra_lateral-texto">Relatórios</span>
          </NavLink>
        </li>


        <li>
          <NavLink to="/settings" className={linkClass}>
            <img src={Configs} alt="Configurações" title="Configurações" />
            <span className="barra_lateral-texto">Configs.</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BarraLateral;
