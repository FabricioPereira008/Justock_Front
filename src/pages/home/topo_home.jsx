import "../../styles/pages/home/topo_home.css";

function TopoHome({ onOpenPlanos }) {
  return (
    <section id="home" className="topo">
      <div className="topo-conteudo">
        <h1>Gestão de estoque rápida e eficaz</h1>
        <p>
          Integre seu inventário com as maiores marketplaces do mercado
          <br />e automatize suas operações!
        </p>
        <button onClick={onOpenPlanos}>Comece agora o TESTE GRÁTIS!</button>
      </div>
      <div className="topo-direita">
        <div className="topo-banner"></div>

        <div className="topo-carrossel">
          <div className="indicador-carrossel ativo"></div>
          <div className="indicador-carrossel"></div>
          <div className="indicador-carrossel"></div>
        </div>
      </div>
    </section>
  );
}

export default TopoHome;
