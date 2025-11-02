import React from "react";
import { NavLink } from "react-router-dom";
import "./barra_lateral.css";

import logo from "../../assets/logo_sem.png";
import Dashboard from "../../assets/dashboard.png";
import Produtos from "../../assets/produtos.png";
import Pedidos from "../../assets/pedidos.png";
import ConexoesImg from "../../assets/conexoes.png";
import Relatorios from "../../assets/relatorios.png";
import Configs from "../../assets/configs.png";

const BarraLateral = () => {
  const linkClass = ({ isActive }) => (isActive ? "barra_lateral-link active" : "barra_lateral-link");

  return (
    <nav className="barra_lateral">
      <NavLink to="/dashboard" className="barra_lateral-logo-link">
        <img src={logo} alt="Logo" className="barra_lateral-logo" />
      </NavLink>

      <ul className="barra_lateral-list">
        <li>
          <NavLink to="/dashboard" className={linkClass}>
            <img src={Dashboard} alt="Dashboard" title="Dashboard" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/produtos" className={linkClass}>
            <img src={Produtos} alt="Produtos" title="Produtos" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/pedidos" className={linkClass}>
            <img src={Pedidos} alt="Pedidos" title="Pedidos" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/conexoes" className={linkClass}>
            <img src={ConexoesImg} alt="Conexoes" title="Conexões" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/relatorios" className={linkClass}>
            <img src={Relatorios} alt="Relatórios" title="Relatórios" />
          </NavLink>
        </li>


        <li>
          <NavLink to="/settings" className={linkClass}>
            <img src={Configs} alt="Configurações" title="Configurações" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BarraLateral;
