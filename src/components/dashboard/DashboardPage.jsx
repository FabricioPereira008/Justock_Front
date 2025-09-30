import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
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

const DashboardPage = () => {
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

  const [recentActivity, setRecentActivity] = useState([]);
  const [alerts, setAlerts] = useState([]);

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
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <div className="info-boxes">
          <div className="info-box blue">
            <div>Total de Produtos</div>
            <div className="info-value">{totalProducts.toLocaleString()}</div>
          </div>
          <div className="info-box orange">
            <div>Produtos em Baixa</div>
            <div className="info-value">{lowStockProducts}</div>
          </div>
          <div className="info-box dark-teal">
            <div>Marketplaces Conectadas</div>
            <div className="info-value">{connectedMarketplaces}</div>
          </div>
          <div className="info-box light-green">
            <div>Status da Sincronização</div>
            <div className="info-value">{syncStatus}</div>
          </div>
        </div>

        <div className="dashboard-content">
          <section className="inventory-overview">
            <div className="section-header">
              <h2>Visão Geral do Inventário</h2>
              <a href="#">ver mais {'>'}</a>
            </div>
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </section>

          <section className="side-sections">
            <div className="recent-activity section-box">
              <h3>Atividade Recente</h3>
              <ul>
                {recentActivity.map((item, index) => (
                  <li key={index} className={`activity-item ${item.type}`}>
                    <span className="activity-icon">{item.icon}</span>
                    <span className="activity-text">{item.text}</span>
                    <span className="activity-time">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="alerts section-box">
              <h3>Alertas</h3>
              <ul>
                {alerts.map((alert, index) => (
                  <li key={index} className={`alert-item ${alert.type}`}>
                    <span className="alert-icon">{alert.icon}</span>
                    <span className="alert-text">{alert.text}</span>
                    <span className="alert-time">{alert.time}</span>
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

export default DashboardPage;
