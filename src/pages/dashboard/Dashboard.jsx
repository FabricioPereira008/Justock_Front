import React, { useEffect, useState } from "react";
import BarraLateral from "../../components/dashboard/BarraLateral";
import BarraSuperior from "../../components/dashboard/BarraSuperior";
import "../../styles/pages/dashboard/dashboard.css";

import mockFetch from "../../mocks/dashboardMocks";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState(0);
  const [connectedMarketplaces, setConnectedMarketplaces] = useState(0);
  const [syncStatus, setSyncStatus] = useState("OFF");

  const [chartData, setChartData] = useState({
    labels: ["Placas-mãe", "Processadores", "Fontes", "Placas de vídeo"],
    datasets: [
      {
        label: "Quantidade",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(173, 214, 0, 0.8)",
          "rgba(0, 0, 255, 0.8)",
          "rgba(0, 51, 51, 0.8)",
          "rgba(255, 99, 71, 0.8)",
        ],
  borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
  borderSkipped: 'bottom',
      },
    ],
  });

  // Os dados de recentActivity e alerts virão do backend futuramente.
  // Os tipos podem ser: validado, reembolsado, novo, sincronizado, baixo, fora-estoque, atualizado, etc.
  // Os ícones podem ser definidos no frontend conforme o tipo, por exemplo:
  // validado/novo/sincronizado/atualizado: verificado, baixo/reembolsado: exclamação, fora-estoque: X, etc.
  const [recentActivity, setRecentActivity] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    mockFetch("/api/total-products")
      .then((res) => res && typeof res.json === 'function' ? res.json() : res)
      .then((data) => setTotalProducts(data && typeof data.total === 'number' ? data.total : 0));

    mockFetch("/api/low-stock-products")
      .then((res) => res && typeof res.json === 'function' ? res.json() : res)
      .then((data) => setLowStockProducts(data && typeof data.total === 'number' ? data.total : 0));

    mockFetch("/api/connected-marketplaces")
      .then((res) => res && typeof res.json === 'function' ? res.json() : res)
      .then((data) => setConnectedMarketplaces(data && typeof data.total === 'number' ? data.total : 0));

    mockFetch("/api/sync-status")
      .then((res) => res && typeof res.json === 'function' ? res.json() : res)
      .then((data) => setSyncStatus(data && typeof data.status === 'string' ? data.status : 'OFF'));

    mockFetch("/api/inventory-overview")
      .then((res) => res && typeof res.json === 'function' ? res.json() : res)
      .then((data) => {
        setChartData({
          labels: (data && Array.isArray(data.labels)) ? data.labels : [],
          datasets: [
            {
              label: "Quantidade",
              data: (data && Array.isArray(data.values)) ? data.values : [],
              backgroundColor: [
                "rgba(173, 214, 0, 0.8)",
                "rgba(0, 0, 255, 0.8)",
                "rgba(0, 51, 51, 0.8)",
                "rgba(255, 99, 71, 0.8)",
              ],
              borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
              borderSkipped: 'bottom',
            },
          ],
        });
      });

    mockFetch("/api/recent-activity")
      .then((res) => res && typeof res.json === 'function' ? res.json() : res)
      .then((data) => setRecentActivity(data && Array.isArray(data.activities) ? data.activities : []));

    mockFetch("/api/alerts")
      .then((res) => res && typeof res.json === 'function' ? res.json() : res)
      .then((data) => setAlerts(data && Array.isArray(data.alerts) ? data.alerts : []));
  }, []);

  return (
    <div className="painel-container">
      <BarraLateral />
      <main className="painel-principal">
        <BarraSuperior />
        <div className="main-content">
          <div className="caixas-info">
            <div className="caixa-info azul">
              <div>Total de Produtos</div>
              <div className="valor-info">{totalProducts.toLocaleString()}</div>
            </div>
            <div className="caixa-info laranja">
              <div>Produtos em Baixa</div>
              <div className="valor-info">{lowStockProducts}</div>
            </div>
            <div className="caixa-info teal-escuro">
              <div>Marketplaces Conectadas</div>
              <div className="valor-info">{connectedMarketplaces}</div>
            </div>
            <div className="caixa-info verde-claro">
              <div>Status da Sincronização</div>
              <div className="valor-info">{syncStatus}</div>
            </div>
          </div>

          <div className="conteudo-painel">
            <section className="visao-inventario">
              <div className="cabecalho-secao">
                <h2>Visão Geral do Inventário</h2>
                <a href="#">ver mais {'>'}</a>
              </div>
              <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </section>

            <section className="secoes-lateral">
              <div className="atividade-recente caixa-secao">
                <h3>Atividade Recente</h3>
                <ul>
                  {recentActivity.map((item, index) => (
                    <li key={index} className={`item-atividade ${item.type}`}>
                      <span className="icone-atividade">{item.icon}</span>
                      <span className="texto-atividade">{item.text}</span>
                      <span className="tempo-atividade">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="alertas caixa-secao">
                <h3>Alertas</h3>
                <ul>
                  {alerts.map((alert, index) => (
                    <li key={index} className={`item-alerta ${alert.type}`}>
                      <span className="icone-alerta">{alert.icon}</span>
                      <span className="texto-alerta">{alert.text}</span>
                      <span className="tempo-alerta">{alert.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
