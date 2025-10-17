const mockData = {
  "/api/total-products": { total: 1350 },
  "/api/low-stock-products": { total: 21 },
  "/api/connected-marketplaces": { total: 3 },
  "/api/sync-status": { status: "ON" },
  "/api/inventory-overview": {
    labels: ["Placas-mãe", "Processadores", "Fontes", "Placas de vídeo"],
    values: [170, 130, 70, 20],
  },
  "/api/recent-activity": {
    activities: [
      { type: "validado", icon: "✔️", text: "Pagamento validado (#878)", time: "15m" },
      { type: "reembolsado", icon: "❗", text: "Pedido reembolsado (#845)", time: "1h" },
      { type: "novo", icon: "✔️", text: "Pedido novo (#897)", time: "2h" },
      { type: "sincronizado", icon: "✔️", text: "Inventário sincronizado", time: "3h" },
    ],
  },
  "/api/alerts": {
    alerts: [
      { type: "baixo", icon: "❗", text: "Item #78 - Em baixa", time: "1h" },
      { type: "fora-estoque", icon: "❌", text: "Item #124 - Esgotado", time: "2h" },
      { type: "baixo", icon: "❗", text: "Item #124 - Em baixa", time: "3h" },
      { type: "atualizado", icon: "✔️", text: "Estoque atualizado", time: "4h" },
    ],
  },
};

function mockFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mockData[url]) {
        resolve({
          ok: true,
          json: () => Promise.resolve(mockData[url]),
        });
      } else {
        resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({ error: "Not found" }),
        });
      }
    }, 300);
  });
}

if (typeof window !== "undefined") {
  window.originalFetch = window.fetch;
  window.fetch = mockFetch;
}

export default mockFetch;
