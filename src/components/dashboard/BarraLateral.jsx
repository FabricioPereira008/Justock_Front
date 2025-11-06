import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./barra_lateral.css";

import logoDetailed from "../../assets/logo_sem.png";
import logoCompact from "../../assets/logo_sem_titulo.png";
import logoContrast from "../../assets/logo_sem_contraste.png";
import logoTitleContrast from "../../assets/logo_sem_titulo_contraste.png";
import { FiHome, FiBox, FiShoppingCart, FiLink, FiBarChart2, FiSettings } from "react-icons/fi";

import { getSidebarPref } from "../../utils/appearance";
import { getAccessibilityPrefs } from "../../utils/accessibility";

let hoveredPersist = false;
const OPEN_DELAY = 180;
const CLOSE_DELAY = 30;

const BarraLateral = () => {
  const [sidebarMode, setSidebarMode] = useState(() => getSidebarPref());
  const [expandedHover, setExpandedHover] = useState(false);
  const [highContrast, setHighContrast] = useState(() => getAccessibilityPrefs().altoContraste === true);
  const navRef = useRef(null);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const logoSwapTimerRef = useRef(null);
  const logoResizeObserverRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const mode = e?.detail?.sidebar || getSidebarPref();
      setSidebarMode(mode);
    };
    window.addEventListener('jt:appearance-updated', handler);
    handler();
    return () => window.removeEventListener('jt:appearance-updated', handler);
  }, []);

  useEffect(() => {
    const onAcc = (e) => {
      const v = e?.detail?.altoContraste;
      if (typeof v === 'boolean') setHighContrast(v);
      else setHighContrast(getAccessibilityPrefs().altoContraste === true);
    };
    window.addEventListener('jt:accessibility-updated', onAcc);
    onAcc({ detail: getAccessibilityPrefs() });
    return () => window.removeEventListener('jt:accessibility-updated', onAcc);
  }, []);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const clearTimers = () => {
      if (openTimerRef.current) { clearTimeout(openTimerRef.current); openTimerRef.current = null; }
      if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    };

    if (sidebarMode !== 'mista') {
      clearTimers();
      setExpandedHover(false);
      if (sidebarMode !== 'detalhada') {
        document.body.classList.remove('sidebar-detalhada');
      }
      return;
    }

    const delayedOpen = () => {
      clearTimeout(closeTimerRef.current);
      openTimerRef.current = setTimeout(() => {
        document.body.classList.add('sidebar-detalhada');
        setExpandedHover(true);
      }, OPEN_DELAY);
    };

    const delayedClose = () => {
      clearTimeout(openTimerRef.current);
      closeTimerRef.current = setTimeout(() => {
        document.body.classList.remove('sidebar-detalhada');
        setExpandedHover(false);
      }, CLOSE_DELAY);
    };

    const onEnter = () => { hoveredPersist = true; delayedOpen(); };
    const onLeave = () => { hoveredPersist = false; delayedClose(); };
    const onFocusIn = () => delayedOpen();
    const onFocusOut = (e) => {
      if (!nav.contains(e.relatedTarget)) delayedClose();
    };

    nav.addEventListener('mouseenter', onEnter);
    nav.addEventListener('mouseleave', onLeave);
    nav.addEventListener('focusin', onFocusIn);
    nav.addEventListener('focusout', onFocusOut);

    const shouldStartExpanded = hoveredPersist || nav.matches(':hover') || nav.contains(document.activeElement);
    if (shouldStartExpanded) {
      document.body.classList.add('sidebar-no-transition');
      document.body.classList.add('sidebar-detalhada');
      setExpandedHover(true);
      setTimeout(() => {
        document.body.classList.remove('sidebar-no-transition');
      }, 80);
    }

    return () => {
      clearTimers();
      nav.removeEventListener('mouseenter', onEnter);
      nav.removeEventListener('mouseleave', onLeave);
      nav.removeEventListener('focusin', onFocusIn);
      nav.removeEventListener('focusout', onFocusOut);
    };
  }, [sidebarMode]);

  const isExpanded = sidebarMode === 'detalhada' || (sidebarMode === 'mista' && expandedHover);
  const [logoShowsExpanded, setLogoShowsExpanded] = useState(isExpanded);

  useEffect(() => {
    if (logoSwapTimerRef.current) {
      clearTimeout(logoSwapTimerRef.current);
      logoSwapTimerRef.current = null;
    }

    if (isExpanded) {
      setLogoShowsExpanded(true);
      if (logoResizeObserverRef.current) {
        logoResizeObserverRef.current.disconnect();
        logoResizeObserverRef.current = null;
      }
      return () => {};
    }

    const navEl = navRef.current;
    if (!navEl) {
      logoSwapTimerRef.current = setTimeout(() => {
        setLogoShowsExpanded(false);
        logoSwapTimerRef.current = null;
      }, 420);
      return () => {
        if (logoSwapTimerRef.current) {
          clearTimeout(logoSwapTimerRef.current);
          logoSwapTimerRef.current = null;
        }
      };
    }

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w <= 74) {
          setLogoShowsExpanded(false);
          observer.disconnect();
          logoResizeObserverRef.current = null;
        }
      }
    });
    observer.observe(navEl);
    logoResizeObserverRef.current = observer;

    return () => {
      if (logoResizeObserverRef.current) {
        logoResizeObserverRef.current.disconnect();
        logoResizeObserverRef.current = null;
      }
      if (logoSwapTimerRef.current) {
        clearTimeout(logoSwapTimerRef.current);
        logoSwapTimerRef.current = null;
      }
    };
  }, [isExpanded]);
  const linkClass = ({ isActive }) => (isActive ? "barra_lateral-item active" : "barra_lateral-item");

  return (
  <nav className="barra_lateral" ref={navRef} aria-label="Menu principal">
      <NavLink to="/dashboard" className="barra_lateral-logo-area">
        <img
          src={logoShowsExpanded ? (highContrast ? logoTitleContrast : logoDetailed) : (highContrast ? logoContrast : logoCompact)}
          alt="Logo Justock"
          className="barra_lateral-logo-img"
        />
      </NavLink>

      <ul className="barra_lateral-lista">
        <li>
          <NavLink to="/dashboard" className={linkClass} aria-label="Dashboard" title="Dashboard">
            <FiHome className="barra_lateral-ico" aria-hidden="true" />
            <span className="barra_lateral-texto">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/produtos" className={linkClass} aria-label="Produtos" title="Produtos">
            <FiBox className="barra_lateral-ico" aria-hidden="true" />
            <span className="barra_lateral-texto">Produtos</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/pedidos" className={linkClass} aria-label="Pedidos" title="Pedidos">
            <FiShoppingCart className="barra_lateral-ico" aria-hidden="true" />
            <span className="barra_lateral-texto">Pedidos</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/conexoes" className={linkClass} aria-label="Conexões" title="Conexões">
            <FiLink className="barra_lateral-ico" aria-hidden="true" />
            <span className="barra_lateral-texto">Conexões</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/relatorios" className={linkClass} aria-label="Relatórios" title="Relatórios">
            <FiBarChart2 className="barra_lateral-ico" aria-hidden="true" />
            <span className="barra_lateral-texto">Relatórios</span>
          </NavLink>
        </li>


        <li>
          <NavLink to="/settings" className={linkClass} aria-label="Configurações" title="Configurações">
            <FiSettings className="barra_lateral-ico" aria-hidden="true" />
            <span className="barra_lateral-texto">Configs.</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BarraLateral;
