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
  "/api/conexoes": {
    marketplaces: [
      {
        id: "mercado_livre",
        name: "Mercado Livre",
        totalVendas: 148,
        pedidosAtivos: 58,
        totalInventario: 104,
        connected: true,
      },
      {
        id: "shopee",
        name: "Shopee",
        connected: false,
      },
      {
        id: "amazon",
        name: "Amazon",
        totalVendas: 215,
        pedidosAtivos: 49,
        totalInventario: 121,
        connected: true,
      },
    ],
  },
  "/api/produtos": {
    products: [
      { id: 1, categoria: "Placas-mãe", marca: "ASUS", nome: "ROG Strix B550-F Gaming", estoque: 8, preco: "R$ 1.200,00", codigoBarras: "123456789", marcador: "" },
      { id: 2, categoria: "Placas de vídeo", marca: "NVIDIA", nome: "RTX 3080 Founders Edition", estoque: 12, preco: "R$ 5.500,00", codigoBarras: "987654321", marcador: "" },
      { id: 3, categoria: "Processadores", marca: "AMD", nome: "Ryzen 7 5800X", estoque: 15, preco: "R$ 2.800,00", codigoBarras: "456789123", marcador: "" },
      { id: 4, categoria: "Placas-mãe", marca: "MSI", nome: "B450 Tomahawk Max", estoque: 5, preco: "R$ 900,00", codigoBarras: "111222333", marcador: "" },
      { id: 5, categoria: "Placas de vídeo", marca: "AMD", nome: "Radeon RX 6800 XT", estoque: 10, preco: "R$ 4.200,00", codigoBarras: "444555666", marcador: "" },
      { id: 6, categoria: "Processadores", marca: "Intel", nome: "Core i9-13900K", estoque: 6, preco: "R$ 3.500,00", codigoBarras: "777888999", marcador: "" },
      { id: 7, categoria: "Memórias RAM", marca: "Corsair", nome: "Vengeance RGB Pro 16GB (2x8GB) 3200MHz", estoque: 20, preco: "R$ 650,00", codigoBarras: "000111222", marcador: "" },
      { id: 8, categoria: "Armazenamento", marca: "Samsung", nome: "970 EVO Plus 1TB NVMe SSD", estoque: 18, preco: "R$ 800,00", codigoBarras: "333444555", marcador: "" },
      { id: 9, categoria: "Placas de vídeo", marca: "NVIDIA", nome: "RTX 4070 Ti", estoque: 7, preco: "R$ 6.800,00", codigoBarras: "666777888", marcador: "" },
      { id: 10, categoria: "Placas-mãe", marca: "Gigabyte", nome: "Z790 Aorus Elite AX", estoque: 9, preco: "R$ 1.500,00", codigoBarras: "999000111", marcador: "" },
      { id: 11, categoria: "Processadores", marca: "AMD", nome: "Ryzen 5 5600X", estoque: 14, preco: "R$ 1.600,00", codigoBarras: "222333444", marcador: "" },
      { id: 12, categoria: "Memórias RAM", marca: "Kingston", nome: "HyperX Fury 32GB (2x16GB) 3600MHz", estoque: 11, preco: "R$ 1.100,00", codigoBarras: "555666777", marcador: "" },
      { id: 13, categoria: "Armazenamento", marca: "WD", nome: "Black SN850X 2TB NVMe SSD", estoque: 13, preco: "R$ 1.400,00", codigoBarras: "888999000", marcador: "" },
      { id: 14, categoria: "Placas de vídeo", marca: "AMD", nome: "Radeon RX 7900 XTX", estoque: 4, preco: "R$ 8.500,00", codigoBarras: "112233445", marcador: "" },
      { id: 15, categoria: "Placas-mãe", marca: "ASUS", nome: "Prime Z690-P", estoque: 16, preco: "R$ 1.100,00", codigoBarras: "556677889", marcador: "" },
      { id: 16, categoria: "Processadores", marca: "Intel", nome: "Core i7-13700K", estoque: 10, preco: "R$ 2.900,00", codigoBarras: "990011122", marcador: "" },
      { id: 17, categoria: "Memórias RAM", marca: "G.Skill", nome: "Trident Z RGB 16GB (2x8GB) 4000MHz", estoque: 19, preco: "R$ 750,00", codigoBarras: "334455667", marcador: "" },
      { id: 18, categoria: "Armazenamento", marca: "Seagate", nome: "FireCuda 530 1TB SSD", estoque: 12, preco: "R$ 950,00", codigoBarras: "778899001", marcador: "" },
      { id: 19, categoria: "Placas de vídeo", marca: "NVIDIA", nome: "RTX 3060 Ti", estoque: 22, preco: "R$ 3.200,00", codigoBarras: "223344556", marcador: "" },
      { id: 20, categoria: "Placas-mãe", marca: "MSI", nome: "MAG B660M Mortar WiFi", estoque: 17, preco: "R$ 950,00", codigoBarras: "667788990", marcador: "" },
    ],
  },
  "/api/pedidos": {
    orders: [
      { id: 1001, dataEmissao: "01/10/2025", dataEntrega: "05/10/2025", marketplace: "Mercado Livre", pagamento: "Cartão de Crédito", status: "Pendente" },
      { id: 1002, dataEmissao: "02/10/2025", dataEntrega: "07/10/2025", marketplace: "Amazon", pagamento: "Boleto", status: "Enviado" },
      { id: 1003, dataEmissao: "03/10/2025", dataEntrega: "08/10/2025", marketplace: "Shopee", pagamento: "Pix", status: "Entregue" },
      { id: 1004, dataEmissao: "04/10/2025", dataEntrega: "", marketplace: "Mercado Livre", pagamento: "Cartão de Crédito", status: "Cancelado" },
      { id: 1005, dataEmissao: "05/10/2025", dataEntrega: "10/10/2025", marketplace: "Amazon", pagamento: "Boleto", status: "Pendente" },
      { id: 1006, dataEmissao: "06/10/2025", dataEntrega: "11/10/2025", marketplace: "Shopee", pagamento: "Pix", status: "Enviado" },
      { id: 1007, dataEmissao: "07/10/2025", dataEntrega: "12/10/2025", marketplace: "Mercado Livre", pagamento: "Cartão de Crédito", status: "Entregue" },
      { id: 1008, dataEmissao: "08/10/2025", dataEntrega: "", marketplace: "Amazon", pagamento: "Boleto", status: "Pendente" },
      { id: 1009, dataEmissao: "09/10/2025", dataEntrega: "14/10/2025", marketplace: "Shopee", pagamento: "Pix", status: "Cancelado" },
      { id: 1010, dataEmissao: "10/10/2025", dataEntrega: "15/10/2025", marketplace: "Mercado Livre", pagamento: "Cartão de Crédito", status: "Enviado" },
      { id: 1011, dataEmissao: "11/10/2025", dataEntrega: "16/10/2025", marketplace: "Amazon", pagamento: "Boleto", status: "Entregue" },
      { id: 1012, dataEmissao: "12/10/2025", dataEntrega: "", marketplace: "Shopee", pagamento: "Pix", status: "Pendente" },
      { id: 1013, dataEmissao: "13/10/2025", dataEntrega: "18/10/2025", marketplace: "Mercado Livre", pagamento: "Cartão de Crédito", status: "Enviado" },
      { id: 1014, dataEmissao: "14/10/2025", dataEntrega: "19/10/2025", marketplace: "Amazon", pagamento: "Boleto", status: "Entregue" },
      { id: 1015, dataEmissao: "15/10/2025", dataEntrega: "", marketplace: "Shopee", pagamento: "Pix", status: "Cancelado" },
      { id: 1016, dataEmissao: "16/10/2025", dataEntrega: "21/10/2025", marketplace: "Mercado Livre", pagamento: "Cartão de Crédito", status: "Pendente" },
      { id: 1017, dataEmissao: "17/10/2025", dataEntrega: "22/10/2025", marketplace: "Amazon", pagamento: "Boleto", status: "Enviado" },
      { id: 1018, dataEmissao: "18/10/2025", dataEntrega: "23/10/2025", marketplace: "Shopee", pagamento: "Pix", status: "Entregue" },
      { id: 1019, dataEmissao: "19/10/2025", dataEntrega: "", marketplace: "Mercado Livre", pagamento: "Cartão de Crédito", status: "Pendente" },
      { id: 1020, dataEmissao: "20/10/2025", dataEntrega: "25/10/2025", marketplace: "Amazon", pagamento: "Boleto", status: "Enviado" },
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
