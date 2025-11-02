import React, { useEffect, useMemo, useState } from "react";
import BarraLateral from "../../components/dashboard/BarraLateral";
import BarraSuperior from "../../components/dashboard/BarraSuperior";
import mockFetch from "../../mocks/dashboardMocks";
import "../../styles/pages/dashboard/dashboard.css";
import "../../styles/pages/dashboard/relatorios.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const YEARS = [2025, 2024, 2023];
const MARKETPLACES = ["Todas as lojas", "Amazon", "Shopee", "Mercado Livre"];
const LINE_METRICS = [
  { id: "total", label: "Total de vendas" },
  { id: "avg", label: "Valor médio da compra" },
  { id: "conv", label: "Taxa de conversão" },
];

const COLORS = {
  blue: "#2563eb",
  green: "#10b981",
  orange: "#f97316",
  darkTeal: "#0f3d3e",
};

function sum(arr) { return arr.reduce((a, b) => a + b, 0); }
function formatBRL(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });
}

const Relatorios = () => {
  const [filters, setFilters] = useState({ year: 2025, marketplace: "Todas as lojas" });
  const [raw, setRaw] = useState(null);
  const [lineMetric, setLineMetric] = useState("total");
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    mockFetch(`/api/reports/${filters.year}`)
      .then(r => r.json())
      .then(setRaw)
      .catch(() => setRaw(null));
  }, [filters.year]);

  const months = raw?.months ?? ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

  const agg = useMemo(() => {
    if (!raw) return null;
    const mk = raw.marketplaces;

    const byMkt = Object.fromEntries(Object.keys(mk).map(k => {
      const completed = mk[k].completed;
      const canceled = mk[k].canceled;
      const revenue = mk[k].revenue;
      const totalCompleted = sum(completed);
      const totalCanceled = sum(canceled);
      const totalRevenue = sum(revenue);
      const avg = totalCompleted > 0 ? totalRevenue / totalCompleted : 0;
      const conv = (totalCompleted + totalCanceled) > 0 ? totalCompleted / (totalCompleted + totalCanceled) : 0;
      return [k, { completed, canceled, revenue, totalCompleted, totalCanceled, totalRevenue, avg, conv }];
    }));

    const allCompletedMonthly = months.map((_, i) => sum(Object.values(byMkt).map(m => m.completed[i] || 0)));
    const allRevenueMonthly = months.map((_, i) => sum(Object.values(byMkt).map(m => m.revenue[i] || 0)));
    const allCanceledMonthly = months.map((_, i) => sum(Object.values(byMkt).map(m => m.canceled[i] || 0)));

    const totals = {
      completed: sum(allCompletedMonthly),
      canceled: sum(allCanceledMonthly),
      revenue: sum(allRevenueMonthly),
    };

    const avg = totals.completed > 0 ? totals.revenue / totals.completed : 0;
    const conv = (totals.completed + totals.canceled) > 0 ? totals.completed / (totals.completed + totals.canceled) : 0;

    // Categoria destaque
    const categories = (raw.categories || []).slice().sort((a,b) => {
      const av = (typeof a.percent === 'number') ? a.percent : a.sales;
      const bv = (typeof b.percent === 'number') ? b.percent : b.sales;
      return (bv || 0) - (av || 0);
    });
    const topCategory = categories[0]?.name || "-";

    return { byMkt, allCompletedMonthly, allRevenueMonthly, allCanceledMonthly, totals, avg, conv, categories, topCategory };
  }, [raw, months]);

  const kpis = useMemo(() => {
    if (!agg) return { total: 0, avg: 0, conv: 0, destaque: "-" };

    if (filters.marketplace === "Todas as lojas") {
      return { total: agg.totals.completed, avg: agg.avg, conv: agg.conv, destaque: agg.topCategory };
    }
    const mk = agg.byMkt[filters.marketplace];
    return {
      total: mk?.totalCompleted || 0,
      avg: mk?.avg || 0,
      conv: mk ? (mk.totalCompleted + mk.totalCanceled > 0 ? mk.totalCompleted / (mk.totalCompleted + mk.totalCanceled) : 0) : 0,
      destaque: agg.topCategory,
    };
  }, [agg, filters.marketplace]);

  const lineData = useMemo(() => {
    if (!agg) return { labels: months, datasets: [] };

    const buildDataset = (label, color, comp, canc, rev) => {
      if (lineMetric === "total") return { label, data: comp, borderColor: color, backgroundColor: color, tension: 0.35 };
      if (lineMetric === "avg") {
        const avgM = comp.map((v, i) => (v > 0 ? (rev[i] / v) : 0));
        return { label, data: avgM, borderColor: color, backgroundColor: color, tension: 0.35 };
      }
      if (lineMetric === "conv") {
        const convM = comp.map((v, i) => (v + canc[i] > 0 ? v / (v + canc[i]) : 0));
        return { label, data: convM, borderColor: color, backgroundColor: color, tension: 0.35 };
      }
      return { label, data: comp, borderColor: color, backgroundColor: color, tension: 0.35 };
    };

    const sets = [];
    const colors = [COLORS.blue, COLORS.orange, COLORS.green];
    const names = ["Amazon", "Shopee", "Mercado Livre"];

    if (filters.marketplace === "Todas as lojas") {
      names.forEach((n, idx) => {
        const m = agg.byMkt[n];
        sets.push(buildDataset(n, colors[idx], m.completed, m.canceled, m.revenue));
      });
    } else {
      const m = agg.byMkt[filters.marketplace];
      const color = filters.marketplace === "Amazon" ? COLORS.blue : filters.marketplace === "Shopee" ? COLORS.orange : COLORS.green;
      sets.push(buildDataset(filters.marketplace, color, m.completed, m.canceled, m.revenue));
    }

    return { labels: months, datasets: sets };
  }, [agg, months, filters.marketplace, lineMetric]);

  const lineOptions = useMemo(() => ({
    responsive: true,
    scales: {
      y: {
        min: lineMetric === "conv" ? 0 : undefined,
        max: lineMetric === "conv" ? 1 : undefined,
        ticks: {
          callback: (val) => lineMetric === "conv" ? Number(val).toFixed(2) : val,
        },
      }
    },
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const v = ctx.parsed.y;
            if (lineMetric === "avg") return `${ctx.dataset.label}: ${formatBRL(v)}`;
            if (lineMetric === "conv") return `${ctx.dataset.label}: ${Number(v).toFixed(2)}`;
            return `${ctx.dataset.label}: ${v.toLocaleString()}`;
          }
        }
      }
    },
    elements: { point: { radius: 2 } }
  }), [lineMetric]);

  // Top categorias - usamos barras horizontais (aproximação do funil sem dependências extras)
  // Categorias para funil (percentuais 0-100)
  const categoriasPercent = useMemo(() => {
    const cats = agg?.categories || [];
    if (!cats.length) return [];
    // Aceita mocks antigos (sales) e novos (percent)
    const values = cats.map(c => typeof c.percent === 'number' ? c.percent : c.sales);
    const total = values.reduce((a,b)=>a+b,0) || 1;
    // Normaliza para 100 se necessário
    const norm = values.map(v => (v / total) * 100);
    return cats.map((c, i) => ({ name: c.name, percent: Number(norm[i].toFixed(1)) }));
  }, [agg]);

  // Distribuição por marketplace (pizza)
  const pieData = useMemo(() => {
    if (!agg) return { labels: [], datasets: [] };
    const names = ["Amazon", "Shopee", "Mercado Livre"];
    const values = names.map(n => agg.byMkt[n].totalCompleted);
    return {
      labels: names,
      datasets: [{
        data: values,
        backgroundColor: [COLORS.blue, COLORS.orange, COLORS.green],
        borderColor: "#ffffff",
      }]
    };
  }, [agg]);
  const pieOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          generateLabels: (chart) => {
            const dataset = chart.data.datasets[0] || { data: [] };
            const total = dataset.data.reduce((a,b)=>a+b,0) || 1;
            return chart.data.labels.map((label, i) => {
              const value = dataset.data[i] || 0;
              const pct = Math.round((value/total)*100);
              const colorArr = Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor : ["#2563eb", "#f97316", "#10b981"]; 
              return {
                text: `${label} (${pct}%)`,
                fillStyle: colorArr[i % colorArr.length],
                strokeStyle: "#fff",
                lineWidth: 1,
                hidden: false,
                index: i
              };
            });
          }
        }
      },
      tooltip: { callbacks: { label: (ctx) => {
        const data = ctx.dataset.data;
        const total = data.reduce((a,b)=>a+b,0) || 1;
        const v = ctx.parsed;
        const pct = ((v/total)*100).toFixed(1);
        return `${ctx.label}: ${v.toLocaleString()} (${pct}%)`;
      }}}
    }
  }), []);

  const applyFilters = (e) => {
    e?.preventDefault?.();
  };

  return (
    <div className="painel-container">
      <BarraLateral />
      <main className="painel-principal">
        <BarraSuperior />
        <div className="main-content">

          <div className="relatorios-filtros">
            <div className="filtros-centro">
              <div className="filtro-item">
                <label>Ano de análise:</label>
                <select className="select-ano" value={filters.year} onChange={e => setFilters(f => ({ ...f, year: Number(e.target.value) }))}>
                  {YEARS.map(y => (<option key={y} value={y}>{y}</option>))}
                </select>
              </div>

              <div className="filtro-item">
                <label>Marketplace:</label>
                <select value={filters.marketplace} onChange={e => setFilters(f => ({ ...f, marketplace: e.target.value }))}>
                  {MARKETPLACES.map(m => (<option key={m} value={m}>{m}</option>))}
                </select>
              </div>

              <button className="btn-filtrar" onClick={applyFilters}>Filtrar</button>
            </div>

            <button className="btn-exportar" onClick={() => setShowExport(true)}>Exportar</button>
          </div>

          <div className="relatorios-kpis">
            <div className="kpi-box azul">
              <div className="kpi-title">Total de Vendas</div>
              <div className="kpi-value">{kpis.total.toLocaleString()}</div>
            </div>
            <div className="kpi-box azul">
              <div className="kpi-title">Valor Médio de Venda</div>
              <div className="kpi-value">{formatBRL(kpis.avg || 0)}</div>
            </div>
            <div className="kpi-box azul">
              <div className="kpi-title">Taxa de conversão (concl. x canc.)</div>
              <div className="kpi-value">{(kpis.conv || 0).toFixed(2)}</div>
            </div>
            <div className="kpi-box azul">
              <div className="kpi-title">Categoria Destaque</div>
              <div className="kpi-value">{kpis.destaque}</div>
            </div>
          </div>

          <div className="relatorios-graficos">
            <section className="grafico grande">
              <div className="section-header">
                <div className="left">
                  <select className="line-metric" value={lineMetric} onChange={(e) => setLineMetric(e.target.value)}>
                    {LINE_METRICS.map(m => (<option key={m.id} value={m.id}>{m.label}</option>))}
                  </select>
                </div>
              </div>
              <Line data={lineData} options={lineOptions} />
            </section>

            <section className="grafico">
              <div className="section-header"><h3>Top Categorias</h3></div>
              <Funnel data={categoriasPercent} />
            </section>

            <section className="grafico">
              <div className="section-header"><h3>Distribuição de Vendas</h3></div>
              <Doughnut data={pieData} options={pieOptions} />
            </section>
          </div>
        </div>
      </main>

      {showExport && (
        <div className="modal-sobreposicao">
          <div className="modal-conteudo export-modal">
            <p>Exportar Relatório</p>
            <div className="modal-botoes">
              <button className="btn-excel" onClick={() => { setShowExport(false); alert("Exportação EXCEL iniciada"); }}>EXCEL</button>
              <button className="btn-csv" onClick={() => { setShowExport(false); alert("Exportação CSV iniciada"); }}>CSV</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relatorios;

const Funnel = ({ data }) => {
  if (!data || !data.length) return null;
  const minWidth = 42;
  const heights = 12;
  const gap = 2;
  const n = data.length;
  const totalHeight = n * heights + (n - 1) * gap;

  const maxPct = Math.max(...data.map(d => d.percent || 0), 1);
  const widthsNorm = data.map(d => {
    const norm = ((d.percent || 0) / maxPct) * 100;
    return Math.max(minWidth, Math.min(100, norm));
  });
  const widths = widthsNorm.reduce((acc, w, i) => {
    if (i === 0) return [w];
    const prev = acc[i - 1];
    const minDrop = 4; 
    const maxDrop = 10; 
    const intended = Math.min(w, prev - minDrop);
    const lower = prev - maxDrop;
    const upper = prev - minDrop;
    const clamped = Math.max(lower, Math.min(intended, upper));
    const adjusted = Math.max(minWidth, clamped);
    acc.push(adjusted);
    return acc;
  }, []);

  if (widths.length >= 3) {
    const idxFontes = widths.length - 3;
    const idxCoolers = widths.length - 2;
    const idxOutros = widths.length - 1;

    const targetCoolers = Math.min(widths[idxCoolers], widths[idxFontes] - 8);
    widths[idxCoolers] = Math.max(36, targetCoolers);

    const targetOutros = Math.min(widths[idxOutros], widths[idxCoolers] - 6);
    widths[idxOutros] = Math.max(30, targetOutros);
  }

  const colors = [COLORS.blue, COLORS.orange, COLORS.green, COLORS.darkTeal];

  const rows = widths.map((w, i) => {
  const next = i < n - 1 ? widths[i + 1] : Math.max(10, w * 0.6);
    const topW = w;
    const botW = next;
    const leftTop = (100 - topW) / 2;
    const rightTop = leftTop + topW;
    const leftBot = (100 - botW) / 2;
    const rightBot = leftBot + botW;
  const yTop = i * (heights + gap);
  const yBot = yTop + heights;
    const color = colors[i % colors.length];

    const points = `${leftTop},${yTop} ${rightTop},${yTop} ${rightBot},${yBot} ${leftBot},${yBot}`;
    const labelY = yTop + heights * 0.62;
    return { points, color, label: `${data[i].name} ${data[i].percent}%`, labelY };
  });

  return (
    <svg className="funnel-svg" viewBox={`0 0 100 ${totalHeight}`} preserveAspectRatio="xMidYMid meet">
      {rows.map((r, idx) => (
        <g key={idx}>
          <polygon className="funnel-seg" points={r.points} fill={r.color} opacity="0.98" stroke="#ffffff" strokeWidth="0.8" />
          <text x="50" y={r.labelY} textAnchor="middle" className="funnel-text">{r.label}</text>
        </g>
      ))}
    </svg>
  );
};
