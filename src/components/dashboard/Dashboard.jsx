import React, { useEffect, useState } from "react";
import BarraLateral from "./BarraLateral";
import "../../styles/dashboard_styles/dashboard.css";

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
      },
    ],
  });

  const [recentActivity, setRecentActivity] = useState([
    { type: "validado", icon: "✔️", text: "Pagamento validado (#878)", time: "15m" },
    { type: "reembolsado", icon: "❗", text: "Pedido reembolsado (#845)", time: "1h" },
    { type: "novo", icon: "✔️", text: "Pedido novo (#897)", time: "2h" },
    { type: "sincronizado", icon: "✔️", text: "Inventário sincronizado", time: "3h" },
  ]);
  const [alerts, setAlerts] = useState([
    { type: "baixo", icon: "❗", text: "Item #78 - Em baixa", time: "1h" },
    { type: "fora-estoque", icon: "❌", text: "Item #124 - Esgotado", time: "2h" },
    { type: "baixo", icon: "❗", text: "Item #124 - Em baixa", time: "3h" },
    { type: "atualizado", icon: "✔️", text: "Estoque atualizado", time: "4h" },
  ]);

  useEffect(() => {
    // Fetch data for info boxes
    fetch("/api/total-products")
      .then((res) => res.json())
      .then((data) => setTotalProducts(data.total));

    fetch("/api/low-stock-products")
      .then((res) => res.json())
      .then((data) => setLowStockProducts(data.total));

    fetch("/api/connected-marketplaces")
      .then((res) => res.json())
      .then((data) => setConnectedMarketplaces(data.total));

    fetch("/api/sync-status")
      .then((res) => res.json())
      .then((data) => setSyncStatus(data.status));

    // Fetch chart data
    fetch("/api/inventory-overview")
      .then((res) => res.json())
      .then((data) => {
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Quantidade",
              data: data.values,
              backgroundColor: [
                "rgba(173, 214, 0, 0.8)",
                "rgba(0, 0, 255, 0.8)",
                "rgba(0, 51, 51, 0.8)",
                "rgba(255, 99, 71, 0.8)",
              ],
            },
          ],
        });
      });

    // Fetch recent activity
    fetch("/api/recent-activity")
      .then((res) => res.json())
      .then((data) => setRecentActivity(data.activities));

    // Fetch alerts
    fetch("/api/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data.alerts));
  }, []);

  return (
    <div className="painel-container">
      <BarraLateral />
      <main className="painel-principal">
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
      </main>
    </div>
  );
};

export default Dashboard;
