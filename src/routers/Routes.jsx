import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraNavegacao from "../pages/home/barra_navegacao.jsx";
import TopoHome from "../pages/home/topo_home.jsx";
import RecursosDisponiveis from "../pages/home/recursos_home.jsx";
import SobreNos from "../pages/home/sobre_nos.jsx";
import RodapeHome from "../pages/home/rodape_home.jsx";
import PlanosModal from "../pages/home/planos_modal.jsx";
import Login from "../pages/login/Login.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Produtos from "../pages/dashboard/Produtos.jsx";
import Pedidos from "../pages/dashboard/Pedidos.jsx";
import Conexoes from "../pages/dashboard/Conexoes.jsx";
import Relatorios from "../pages/dashboard/Relatorios.jsx";
import Configuracoes from "../pages/dashboard/Configuracoes.jsx";

const Routs = () => {
  const [planosOpen, setPlanosOpen] = useState(false);
  const openPlanos = () => setPlanosOpen(true);
  const closePlanos = () => setPlanosOpen(false);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BarraNavegacao onOpenPlanos={openPlanos} />
                <TopoHome onOpenPlanos={openPlanos} />
                <RecursosDisponiveis />
                <SobreNos />
                <RodapeHome />
                <PlanosModal open={planosOpen} onClose={closePlanos} />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/conexoes" element={<Conexoes />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/settings" element={<Configuracoes />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Routs;
