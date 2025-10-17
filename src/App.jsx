import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraNavegacao from "./components/home/barra_navegacao.jsx";
import TopoHome from "./components/home/topo_home.jsx";
import RecursosDisponiveis from "./components/home/recursos_home.jsx"
import RodapeHome from "./components/home/rodape_home.jsx"
import Login from "./components/login/Login.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Produtos from "./components/dashboard/Produtos.jsx";
import Pedidos from "./components/dashboard/Pedidos.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
      <Routes>
        <Route path="/" element={
          <>
            <BarraNavegacao />
            <TopoHome />
            <RecursosDisponiveis />
            <RodapeHome />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App