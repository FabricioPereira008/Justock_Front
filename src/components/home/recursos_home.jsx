import "../../styles/home_styles/recursos_home.css";
import Reset from "../../assets/reset.png";
import Carrinho from "../../assets/carrinho.png";
import Alarme from "../../assets/alarme.png";
import Mao from "../../assets/mao.png";
import Suporte from "../../assets/suporte.png";

const features = [
  {
    title: "Sincronização Automática",
    text: "Sincronize o inventário entre plataformas sem esforço!",
    icon: Reset,
  },
  {
    title: "Marketplace Conectada",
    text: "Conecte suas contas e gerencie tudo em apenas um lugar!",
    icon: Carrinho,
  },
  {
    title: "Atualização em Tempo Real",
    text: "Sistema atualiza sozinho o status de pedidos!",
    icon: Alarme,
  },
  {
    title: "Controle sem Limites",
    text: "Atualizações e adições podem ser feitas também de forma manual!",
    icon: Mao,
  },
  {
    title: "Suporte de Qualidade",
    text: "Nossa equipe está sempre pronta para melhor atendê-lo.",
    icon: Suporte,
  },
];

function RecursosDisponiveis() {
  return (
    <section className="features">
      {features.map((f, index) => (
        <div key={index} className="feature-card">
          <div className="feature-icon">
            <img src={f.icon} alt={f.title} />
          </div>
          <div className="feature-text">
            <div className="feature-title-container">
              <h3>{f.title}</h3>
              <div className="feature-divider"></div>
            </div>
            <p>{f.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default RecursosDisponiveis;
