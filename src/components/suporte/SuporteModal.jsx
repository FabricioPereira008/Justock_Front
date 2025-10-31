import "./suporte_modal.css";

function SuporteModal({ open, onClose }) {
  const overlayClass = open ? "suporte-fundo aberto" : "suporte-fundo";
  const modalClass = open ? "suporte-janela aberto" : "suporte-janela";

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={overlayClass} onClick={onClose}>
      <div
        className={modalClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="suporte-titulo"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="suporte-cabecalho">
          <div className="suporte-cabecalho-conteudo">
            <p className="suporte-titulo" id="suporte-titulo">Suporte JusTock</p>
            <span className="suporte-subtitulo">Equipe disponível para ajudar</span>
          </div>
          <button
            type="button"
            className="suporte-fechar"
            aria-label="Fechar suporte"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className="suporte-corpo">
          <div className="suporte-boasvindas">
            <h4>Olá!</h4>
            <p>Como podemos ajudar hoje?</p>
          </div>
        </div>
        <form className="suporte-rodape" onSubmit={handleSubmit}>
          <div className="suporte-linha-entrada">
            <button type="button" className="suporte-anexar" aria-label="Anexar arquivo">
              Anexar
            </button>
            <textarea
              className="suporte-entrada"
              placeholder="Digite sua mensagem aqui..."
              rows={2}
            ></textarea>
          </div>
          <button type="submit" className="suporte-enviar">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default SuporteModal;
