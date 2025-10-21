import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraNavegacao from "./pages/home/barra_navegacao.jsx";
import TopoHome from "./pages/home/topo_home.jsx";
import RecursosDisponiveis from "./pages/home/recursos_home.jsx"
import RodapeHome from "./pages/home/rodape_home.jsx"
import Login from "./pages/login/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Produtos from "./pages/dashboard/Produtos.jsx";
import Pedidos from "./pages/dashboard/Pedidos.jsx";

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