import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import BarraLateral from "../../components/dashboard/BarraLateral";
import BarraSuperior from "../../components/dashboard/BarraSuperior";
import "../../styles/pages/dashboard/dashboard.css";
import "../../styles/pages/dashboard/configuracoes.css";
import { getFontPref, getSidebarPref, setFontPref, setSidebarPref } from "../../utils/appearance";
import { getAccessibilityPrefs, setAccessibilityPrefs, playFeedback } from "../../utils/accessibility";
import { useSrOptimized, srProps } from "../../utils/useA11y";

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

// Helpers para interconversão de cores (#hex <-> rgb(r,g,b))
function toHex(color) {
  if (!color) return '#00e0ff';
  const s = String(color).trim();
  if (s.startsWith('#')) return s;
  const m = s.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (!m) return '#00e0ff';
  const r = clamp255(parseInt(m[1], 10));
  const g = clamp255(parseInt(m[2], 10));
  const b = clamp255(parseInt(m[3], 10));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
function toRgb(color) {
  if (!color) return 'rgb(0, 224, 255)';
  const s = String(color).trim();
  if (s.startsWith('rgb')) return s;
  if (s.startsWith('#')) {
    let h = s.replace('#','');
    if (h.length === 3) h = h.split('').map(ch => ch+ch).join('');
    const num = parseInt(h, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return s;
}
function clamp255(n) { return Math.max(0, Math.min(255, isFinite(n) ? n : 0)); }

const Configuracoes = () => {
  const srOpt = useSrOptimized();
  // Aparência
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [fonte, setFonte] = useState("media");
  const [sidebar, setSidebar] = useState("mista");

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

  const baseAcess = getAccessibilityPrefs();
  const [acess, setAcess] = useState(() => baseAcess);
  const [cursorEnabled, setCursorEnabled] = useState(() => baseAcess.cursorEnabled ?? false);
  const [cursorSize, setCursorSize] = useState(() => baseAcess.cursorSize || 'medium');
  const [cursorColor, setCursorColor] = useState(() => baseAcess.cursorColor || '#00e0ff');

  const handleSave = () => {
    setFontPref(fonte);
    setSidebarPref(sidebar);
    // persist and apply accessibility classes globally
    // persist and apply accessibility classes globally (incl. cursor)
    setAccessibilityPrefs({
      ...acess,
      cursorEnabled,
      cursorSize,
      cursorColor,
    });
    console.log("Preferências salvas:", {
      temaEscuro, fonte, sidebar, idioma, moeda, notifs, acess, cursorEnabled, cursorSize, cursorColor
    });
    // optional audible feedback if enabled
    playFeedback('success');
  };

  const updateNotifs = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  const updateAcess = (key) => setAcess(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="painel-container">
      <BarraLateral />
      <main className="painel-principal">
        <BarraSuperior />
        <div className="main-content pagina-configuracoes" {...srProps(srOpt, { role: 'main', 'aria-label': 'Configurações da conta' })}>
          <h2 className="conf-titulo">Configurações</h2>

          <div className="conf-grade">
            {/* Coluna Esquerda */}
            <div className="conf-pilha conf-pilha--espalhar">
              <section className="conf-cartao" {...srProps(srOpt, { role: 'region', 'aria-labelledby': 'conf-aparencia' })}>
                <h2 id="conf-aparencia" className="conf-cartao-titulo">Aparência</h2>
                <div className="conf-secao">
                  <div className="conf-linha">
                    <span className="conf-linha-rotulo">Tema:</span>
                    <ThemeSwitch value={temaEscuro} onChange={setTemaEscuro} />
                  </div>
                  <Select
                    id="fonte"
                    label="Tamanho da fonte:"
                    value={fonte}
                    onChange={(v) => { setFonte(v); }}
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
                      { value: "mista", label: "Mista (padrão)" },
                      { value: "compacta", label: "Compacta (ícones)" },
                      { value: "detalhada", label: "Detalhada (expandida)" },
                    ]}
                  />
                </div>
              </section>

              <section className="conf-cartao" {...srProps(srOpt, { role: 'region', 'aria-labelledby': 'conf-exibicao' })}>
                <h2 id="conf-exibicao" className="conf-cartao-titulo">Exibição</h2>
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
            <section className="conf-cartao conf-cartao--justo" {...srProps(srOpt, { role: 'region', 'aria-labelledby': 'conf-notificacoes' })}>
              <h2 id="conf-notificacoes" className="conf-cartao-titulo">Notificações</h2>
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
              <section className="conf-cartao" {...srProps(srOpt, { role: 'region', 'aria-labelledby': 'conf-acessibilidade' })}>
                <h2 id="conf-acessibilidade" className="conf-cartao-titulo">Acessibilidade</h2>
                <div className="conf-secao conf-lista">
                  <CheckItem id="a1" checked={acess.altoContraste} onChange={() => updateAcess("altoContraste")}>Modo de alto contraste</CheckItem>
                  <CheckItem id="a2" checked={acess.dislexico} onChange={() => updateAcess("dislexico")}>Modo Disléxico (facilita leitura)</CheckItem>
                  <CheckItem id="a3" checked={acess.focoVisivel} onChange={() => updateAcess("focoVisivel")}>Indicador de foco visível</CheckItem>
                  <CheckItem id="a5" checked={acess.feedbackSonoro} onChange={() => updateAcess("feedbackSonoro")}>Feedback sonoro (sucesso/erro)</CheckItem>
                  <CheckItem id="a6" checked={acess.toggleLeitor} onChange={() => updateAcess("toggleLeitor")}>Toggle (otimizar leitor de tela)</CheckItem>
                </div>
              </section>

              <section className="conf-cartao" {...srProps(srOpt, { role: 'region', 'aria-labelledby': 'conf-estetica' })}>
                <h2 id="conf-estetica" className="conf-cartao-titulo">Estética</h2>
                <div className="conf-secao">
                  <Toggle
                    id="cursor-enabled"
                    checked={cursorEnabled}
                    onChange={() => setCursorEnabled(v => !v)}
                    label="Ativar cursor personalizado"
                  />
                  {cursorEnabled && (
                    <>
                      <Select
                        id="cursor-size"
                        label="Tamanho do cursor:"
                        value={cursorSize}
                        onChange={setCursorSize}
                        options={[
                          { value: "small", label: "Pequeno" },
                          { value: "medium", label: "Padrão (Médio)" },
                          { value: "large", label: "Grande" },
                        ]}
                      />
                      <div className="conf-campo">
                        <label className="conf-rotulo" htmlFor="cursor-color">Cor do cursor (RGB):</label>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <input
                            id="cursor-color"
                            type="color"
                            value={toHex(cursorColor)}
                            onChange={(e) => setCursorColor(e.target.value)}
                            aria-label="Selecionar cor do cursor"
                            style={{ width: 44, height: 28, border: '1px solid #ccc', borderRadius: 4, background: '#fff' }}
                          />
                          <input
                            type="text"
                            value={toRgb(cursorColor)}
                            onChange={(e) => setCursorColor(e.target.value)}
                            aria-label="Editar cor RGB do cursor"
                            placeholder="rgb(0, 224, 255)"
                            className="conf-input"
                            style={{ flex: 1, minWidth: 0 }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>

          <div className="conf-acoes">
            <button className="conf-btn-primario" onClick={handleSave} {...srProps(srOpt, { 'aria-label': 'Salvar preferências' })}>Salvar</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Configuracoes;
