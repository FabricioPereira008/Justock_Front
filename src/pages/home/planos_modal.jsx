import React from "react";
import "../../styles/pages/home/planos_modal.css";

const planos = [
  {
    nome: "Básico",
    preco: "R$49,99",
    usuarios: "1 usuário",
    integracoes: "Integrações ilimitadas",
    produtos: "Produtos ilimitados",
    suporte: "Suporte via email",
    recomendado: false,
  },
  {
    nome: "Profissional",
    preco: "R$79,99",
    usuarios: "10 usuários",
    integracoes: "Integrações ilimitadas",
    produtos: "Produtos ilimitados",
    suporte: "Suporte via chat/email",
    recomendado: true,
  },
  {
    nome: "Empresarial",
    preco: "R$109,99",
    usuarios: "Usuários ilimitados",
    integracoes: "Integrações ilimitadas",
    produtos: "Produtos ilimitados",
    suporte: "Suporte prioritário 24/7",
    recomendado: false,
  },
];

const PlanosModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="sobreposicao-planos" onClick={onClose}>
      <div className="caixa-planos" onClick={e => e.stopPropagation()}>
        <button className="fechar-planos" aria-label="Fechar" onClick={onClose}>×</button>
        <h1 className="titulo-planos">Nossos Planos</h1>
        <div className="cartoes-planos">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`cartao-plano${plano.recomendado ? " recomendado" : ""}`}
            >
              {plano.recomendado && (
                <div className="selo-recomendado">RECOMENDADO</div>
              )}
              <h2>{plano.nome}</h2>
              <div className="preco-plano">{plano.preco}<span> /mês</span></div>
              <p className="mes-gratis">1 mês grátis</p>
              <ul className="beneficios-plano">
                <li>✓ {plano.usuarios}</li>
                <li>✓ {plano.integracoes}</li>
                <li>✓ {plano.produtos}</li>
                <li>✓ {plano.suporte}</li>
              </ul>
              <button className="botao-plano">Escolher Plano</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanosModal;
