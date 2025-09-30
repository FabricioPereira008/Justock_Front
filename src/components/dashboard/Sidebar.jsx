import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css"; // We will create styles in dashboard_styles folder

import homeIcon from "../../assets/home-icon.svg";
import productsIcon from "../../assets/products-icon.svg";
import listIcon from "../../assets/list-icon.svg";
import linkIcon from "../../assets/link-icon.svg";
import chartIcon from "../../assets/chart-icon.svg";
import clockIcon from "../../assets/clock-icon.svg";
import settingsIcon from "../../assets/settings-icon.svg";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="sidebar-list">
        <li>
          <NavLink to="/" className="sidebar-link" activeclassname="active">
            <img src={homeIcon} alt="Home" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="sidebar-link" activeclassname="active">
            <img src={productsIcon} alt="Products" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/list" className="sidebar-link" activeclassname="active">
            <img src={listIcon} alt="List" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/links" className="sidebar-link" activeclassname="active">
            <img src={linkIcon} alt="Links" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className="sidebar-link" activeclassname="active">
            <img src={chartIcon} alt="Dashboard" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/clock" className="sidebar-link" activeclassname="active">
            <img src={clockIcon} alt="Clock" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="sidebar-link" activeclassname="active">
            <img src={settingsIcon} alt="Settings" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
