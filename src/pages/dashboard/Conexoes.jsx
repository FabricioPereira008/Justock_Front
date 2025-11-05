import React, { useEffect, useState } from "react";
import BarraLateral from "../../components/dashboard/BarraLateral";
import BarraSuperior from "../../components/dashboard/BarraSuperior";
import "../../styles/pages/dashboard/conexoes.css";

import ML from "../../assets/mercadolivre.png";
import Shopee from "../../assets/shopee.png";
import Amazon from "../../assets/amazon.png";
import mockFetch from "../../mocks/dashboardMocks";
import { useSrOptimized, srProps } from "../../utils/useA11y";


const Conexoes = () => {
  const [marketplaces, setMarketplaces] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const srOpt = useSrOptimized();

  useEffect(() => {
    setCarregando(true);
    fetch("/api/conexoes")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data && data.marketplaces) {
          setMarketplaces(data.marketplaces);
        }
      })
      .catch(() => {
        mockFetch("/api/conexoes")
          .then((res) => res && res.json ? res.json() : Promise.resolve(res))
          .then((data) => {
            if (data && data.marketplaces) {
              setMarketplaces(data.marketplaces);
            } else {
              setMarketplaces([]);
            }
          })
          .catch(() => {
            setMarketplaces([]);
          });
      })
      .finally(() => setCarregando(false));
  }, []);

  const logo_map = {
    mercado_livre: ML,
    shopee: Shopee,
    amazon: Amazon,
  };

  return (
    <div className="painel-container">
      <BarraLateral />
      <main className="painel-principal">
        <BarraSuperior />
        <div className="main-content conexoes_pagina" {...srProps(srOpt, { role: 'main', 'aria-label': 'Conexões com marketplaces' })}>
          <div className="conexoes_cabecalho">
            <h2>Conexões com Marketplaces</h2>
          </div>

          <div className="conexoes_cards" {...srProps(srOpt, { role: 'region', 'aria-label': 'Lista de conexões' })}>
            {carregando ? (
              <div>Carregando...</div>
            ) : (
              marketplaces.map((mkt) => (
                <div className="conexoes_card" key={mkt.id} {...srProps(srOpt, { role: 'group', 'aria-label': `${mkt.name}. ${mkt.connected ? 'Conectado' : 'Desconectado'}` })}>
                  <img src={logo_map[mkt.id]} alt={mkt.name} className="conexoes_logo" />
                  <div className="conexoes_card_corpo">
                    {mkt.connected ? (
                      <div className="conexoes_status conexoes_status_conectado" {...srProps(srOpt, { 'aria-label': 'Status: Conectado' })}>Conectado</div>
                    ) : (
                      <button className="conexoes_status conexoes_status_conectar" style={{border: 'none', cursor: 'pointer'}} onClick={() => alert('Funcionalidade de conectar ainda não implementada.')} {...srProps(srOpt, { 'aria-label': `Conectar ${mkt.name}` })}>Conectar</button>
                    )}
                    {mkt.connected ? (
                      <div className="conexoes_dados">
                        <p {...srProps(srOpt, { 'aria-label': `Total de vendas ${mkt.totalVendas}` })}><strong>Total de vendas:</strong> {mkt.totalVendas}</p>
                        <p {...srProps(srOpt, { 'aria-label': `Pedidos ativos ${mkt.pedidosAtivos}` })}><strong>Pedidos ativos:</strong> {mkt.pedidosAtivos}</p>
                        <p {...srProps(srOpt, { 'aria-label': `Quantidade em inventário ${mkt.totalInventario}` })}><strong>Quant. Inventário:</strong> {mkt.totalInventario}</p>
                      </div>
                    ) : (
                      <div className="conexoes_dados_vazio">Sem dados</div>
                    )}
                  </div>
                  {mkt.connected && <button className="conexoes_btn_gerenciar" {...srProps(srOpt, { 'aria-label': `Gerenciar conexão de ${mkt.name}` })}>Gerenciar</button>}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Conexoes;
