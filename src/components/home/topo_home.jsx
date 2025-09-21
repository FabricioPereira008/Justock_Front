import "../../styles/home_styles/topo_home.css";

function TopoHome() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Gestão de estoque rápida e eficaz</h1>
        <p>
          Integre seu inventário com as maiores marketplaces do mercado
          <br />e automatize suas operações!
        </p>
        <button>Comece agora o TESTE GRÁTIS!</button>
      </div>

      <div className="hero-right">
        <div className="hero-banner"></div>

        <div className="hero-carousel">
          <div className="carousel-indicator active"></div>
          <div className="carousel-indicator"></div>
          <div className="carousel-indicator"></div>
        </div>
      </div>
    </section>
  );
}

export default TopoHome;
