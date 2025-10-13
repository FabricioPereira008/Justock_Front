import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/dashboard_styles/barra_lateral.css";

import logo from "../../assets/logo_sem.png";
import Dashboard from "../../assets/dashboard.png";
import Produtos from "../../assets/produtos.png";
import Pedidos from "../../assets/pedidos.png";
import Conexoes from "../../assets/conexoes.png";
import Relatorios from "../../assets/relatorios.png";
import Suporte from "../../assets/suporte_dash.png";
import Configs from "../../assets/configs.png";

const BarraLateral = () => {
  return (
    <nav className="barra_lateral">
      <NavLink to="/dashboard" className="barra_lateral-logo-link">
        <img src={logo} alt="Logo" className="barra_lateral-logo" />
      </NavLink>
      <ul className="barra_lateral-list">
        <li>
          <NavLink to="/dashboard" className="barra_lateral-link" activeClassName="active">
            <img src={Dashboard} alt="Dashboard" title="Dashboard" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="barra_lateral-link" activeClassName="active">
            <img src={Produtos} alt="Products" title="Produtos" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/list" className="barra_lateral-link" activeClassName="active">
            <img src={Pedidos} alt="List" title="Pedidos" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/links" className="barra_lateral-link" activeClassName="active">
            <img src={Conexoes} alt="Links" title="Conexões" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className="barra_lateral-link" activeClassName="active">
            <img src={Relatorios} alt="Reports" title="Relatórios" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/clock" className="barra_lateral-link" activeClassName="active">
            <img src={Suporte} alt="Clock" title="Suporte" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="barra_lateral-link" activeClassName="active">
            <img src={Configs} alt="Settings" title="Configurações" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BarraLateral;
