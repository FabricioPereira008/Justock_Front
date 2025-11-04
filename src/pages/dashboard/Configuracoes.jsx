import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import BarraLateral from "../../components/dashboard/BarraLateral";
import BarraSuperior from "../../components/dashboard/BarraSuperior";
import "../../styles/pages/dashboard/dashboard.css";
import "../../styles/pages/dashboard/configuracoes.css";
import { getFontPref, getSidebarPref, setFontPref, setSidebarPref } from "../../utils/appearance";

const Toggle = ({ checked, onChange, label, id }) => {
  return (
    <label className="conf-toggle" htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <span className="conf-toggle-trilho" aria-hidden>
        <span className="conf-toggle-bolinha" />
      </span>
      {label && <span className="conf-toggle-rotulo">{label}</span>}
    </label>
  );
};

const ThemeSwitch = ({ value, onChange }) => (
  <button
    type="button"
    className={`conf-tema-switch ${value ? 'escuro' : 'claro'}`}
    onClick={() => onChange(!value)}
    aria-label={value ? 'Tema escuro' : 'Tema claro'}
  >
    <span className="conf-tema-icone sol"><FiSun /></span>
    <span className="conf-tema-icone lua"><FiMoon /></span>
  </button>
);

const CheckItem = ({ checked, onChange, children, id }) => (
  <label className="conf-item-check" htmlFor={id}>
    <input id={id} type="checkbox" checked={checked} onChange={onChange} />
    <span className="conf-check-visual" aria-hidden />
    <span className="conf-check-rotulo">{children}</span>
  </label>
);

const Select = ({ label, value, onChange, options, id }) => (
  <div className="conf-campo">
    <label className="conf-rotulo" htmlFor={id}>{label}</label>
    <select id={id} className="conf-select" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(opt => (
        <option key={String(opt.value)} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const Configuracoes = () => {
  // Aparência
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [fonte, setFonte] = useState("media");
  const [sidebar, setSidebar] = useState("compacta");

  // carregar preferências salvas
  useEffect(() => {
    setFonte(getFontPref());
    setSidebar(getSidebarPref());
  }, []);

  // Exibição
  const [idioma, setIdioma] = useState("pt-BR");
  const [moeda, setMoeda] = useState("BRL");

  // Notificações
  const [notifs, setNotifs] = useState({
    estoqueBaixo: true,
    produtoEsgotado: false,
    novoPedido: true,
    pagamentoAprovado: true,
    aguardandoEnvio: false,
    erroSincronizacao: false,
    pedidoCancelado: false,
    reembolsado: false,
    porEmail: true,
  });

  const [acess, setAcess] = useState({
    altoContraste: true,
    dislexico: true,
    focoVisivel: true,
    textoAlternativo: true,
    feedbackSonoro: true,
    toggleLeitor: true,
  });
  const [cursor, setCursor] = useState("padrao");

  const handleSave = () => {
    setFontPref(fonte);
    setSidebarPref(sidebar);
    console.log("Preferências salvas:", {
      temaEscuro, fonte, sidebar, idioma, moeda, notifs, acess, cursor
    });
  };

  const updateNotifs = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  const updateAcess = (key) => setAcess(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="painel-container">
      <BarraLateral />
      <main className="painel-principal">
        <BarraSuperior />
        <div className="main-content pagina-configuracoes">
          <h2 className="conf-titulo">Configurações</h2>

          <div className="conf-grade">
            {/* Coluna Esquerda */}
            <div className="conf-pilha conf-pilha--espalhar">
              <section className="conf-cartao">
                <h2 className="conf-cartao-titulo">Aparência</h2>
                <div className="conf-secao">
                  <div className="conf-linha">
                    <span className="conf-linha-rotulo">Tema:</span>
                    <ThemeSwitch value={temaEscuro} onChange={setTemaEscuro} />
                  </div>
                  <Select
                    id="fonte"
                    label="Tamanho da fonte:"
                    value={fonte}
                    onChange={(v) => { setFonte(v);}}
                    options={[
                      { value: "pequena", label: "Pequena" },
                      { value: "media", label: "Padrão (Médio)" },
                      { value: "grande", label: "Grande" },
                    ]}
                  />
                  <Select
                    id="sidebar"
                    label="Barra lateral:"
                    value={sidebar}
                    onChange={(v) => { setSidebar(v);}}
                    options={[
                      { value: "compacta", label: "Compacta (ícones)" },
                      { value: "detalhada", label: "Detalhada (expandida)" },
                    ]}
                  />
                </div>
              </section>

              <section className="conf-cartao">
                <h2 className="conf-cartao-titulo">Exibição</h2>
                <div className="conf-secao">
                  <Select
                    id="idioma"
                    label="Idioma:"
                    value={idioma}
                    onChange={setIdioma}
                    options={[
                      { value: "pt-BR", label: "Português (Brasil)" },
                      { value: "en-US", label: "Inglês (EUA)" },
                      { value: "es-ES", label: "Espanhol" },
                    ]}
                  />
                  <Select
                    id="moeda"
                    label="Moeda:"
                    value={moeda}
                    onChange={setMoeda}
                    options={[
                      { value: "BRL", label: "Real (BRL)" },
                      { value: "USD", label: "Dólar (USD)" },
                      { value: "EUR", label: "Euro (EUR)" },
                    ]}
                  />
                </div>
              </section>
            </div>

            {/* Coluna Central */}
            <section className="conf-cartao conf-cartao--justo">
              <h2 className="conf-cartao-titulo">Notificações</h2>
              <div className="conf-secao conf-lista">
                <CheckItem id="n1" checked={notifs.estoqueBaixo} onChange={() => updateNotifs("estoqueBaixo")}>Estoque baixo (itens)</CheckItem>
                <CheckItem id="n2" checked={notifs.produtoEsgotado} onChange={() => updateNotifs("produtoEsgotado")}>Produto esgotado</CheckItem>
                <CheckItem id="n3" checked={notifs.novoPedido} onChange={() => updateNotifs("novoPedido")}>Novo pedido sincronizado</CheckItem>
                <CheckItem id="n4" checked={notifs.pagamentoAprovado} onChange={() => updateNotifs("pagamentoAprovado")}>Pagamento aprovado</CheckItem>
                <CheckItem id="n5" checked={notifs.aguardandoEnvio} onChange={() => updateNotifs("aguardandoEnvio")}>Pedido aguardando envio</CheckItem>
                <CheckItem id="n6" checked={notifs.erroSincronizacao} onChange={() => updateNotifs("erroSincronizacao")}>Erro na sincronização de estoque</CheckItem>
                <CheckItem id="n7" checked={notifs.pedidoCancelado} onChange={() => updateNotifs("pedidoCancelado")}>Pedido cancelado</CheckItem>
                <CheckItem id="n8" checked={notifs.reembolsado} onChange={() => updateNotifs("reembolsado")}>Pedido reembolsado</CheckItem>
                <div className="conf-divisor" />
                <CheckItem id="n9" checked={notifs.porEmail} onChange={() => updateNotifs("porEmail")}>Receber notificações por email</CheckItem>
              </div>
            </section>

            {/* Coluna Direita */}
            <div className="conf-pilha conf-pilha--espalhar">
              <section className="conf-cartao">
                <h2 className="conf-cartao-titulo">Acessibilidade</h2>
                <div className="conf-secao conf-lista">
                  <CheckItem id="a1" checked={acess.altoContraste} onChange={() => updateAcess("altoContraste")}>Modo de alto contraste</CheckItem>
                  <CheckItem id="a2" checked={acess.dislexico} onChange={() => updateAcess("dislexico")}>Modo Disléxico (facilita leitura)</CheckItem>
                  <CheckItem id="a3" checked={acess.focoVisivel} onChange={() => updateAcess("focoVisivel")}>Indicador de foco visível</CheckItem>
                  <CheckItem id="a4" checked={acess.textoAlternativo} onChange={() => updateAcess("textoAlternativo")}>Texto alternativo (SR labels)</CheckItem>
                  <CheckItem id="a5" checked={acess.feedbackSonoro} onChange={() => updateAcess("feedbackSonoro")}>Feedback sonoro (sucesso/erro)</CheckItem>
                  <CheckItem id="a6" checked={acess.toggleLeitor} onChange={() => updateAcess("toggleLeitor")}>Toggle (otimizar leitor de tela)</CheckItem>
                </div>
              </section>

              <section className="conf-cartao">
                <h2 className="conf-cartao-titulo">Estética</h2>
                <div className="conf-secao">
                  <Select
                    id="cursor"
                    label="Cursor:"
                    value={cursor}
                    onChange={setCursor}
                    options={[
                      { value: "padrao", label: "Padrão" },
                      { value: "grande", label: "Grande" },
                      { value: "fino", label: "Fino" },
                    ]}
                  />
                </div>
              </section>
            </div>
          </div>

          <div className="conf-acoes">
            <button className="conf-btn-primario" onClick={handleSave}>Salvar</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Configuracoes;
