import BarraNavegacao from "./components/home/barra_navegacao.jsx";
import TopoHome from "./components/home/topo_home.jsx";
import RecursosDisponiveis from "./components/home/recursos_home.jsx"
import RodapeHome from "./components/home/rodape_home.jsx"

function App() {
  return (
    <div className="app-container">
      <BarraNavegacao />
      <TopoHome />
      <RecursosDisponiveis />
      <RodapeHome />
    </div>
  );
}

export default App