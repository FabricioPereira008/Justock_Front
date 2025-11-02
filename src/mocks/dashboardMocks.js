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
  // Relatórios por ano
  "/api/reports/2025": {
    months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    // Total concluído do ano: 30.455 (alguns meses em branco por ser ano corrente)
    marketplaces: {
      "Amazon": {
        // Reorganizado por mês para alternar liderança (mantém total do ano)
        completed: [820, 780, 810, 860, 905, 880, 940, 990, 910, 770, 751, 0],
        canceled:  (function(){ const r=[0.28,0.36,0.22,0.18,0.30,0.40,0.24,0.20,0.35,0.46,0.19,0.10]; return [820,780,810,860,905,880,940,990,910,770,751,0].map((v,i)=>Math.round(v*r[i])); })(),
        revenue:   (function(){
          const c=[820,780,810,860,905,880,940,990,910,770,751,0];
          const price=[210,190,205,175,185,220,198,186,230,170,180,160];
          return c.map((v,i)=> Math.round(v*price[i]));
        })()
      },
      "Shopee": {
        // Alternando liderança em vários meses
        completed: [980, 795, 870, 885, 965, 905, 1120, 1005, 1065, 785, 1513, 0],
        canceled:  (function(){ const r=[0.42,0.20,0.38,0.16,0.44,0.26,0.35,0.18,0.50,0.66,0.22,0.10]; return [980,795,870,885,965,905,1120,1005,1065,785,1513,0].map((v,i)=>Math.round(v*r[i])); })(),
        revenue:   (function(){
          const c=[980,795,870,885,965,905,1120,1005,1065,785,1513,0];
          const price=[150,120,138,125,142,158,135,128,160,115,170,140];
          return c.map((v,i)=> Math.round(v*price[i]));
        })()
      },
      "Mercado Livre": {
        // Alternando liderança em vários meses
        completed: [840, 1050, 835, 920, 920, 1040, 955, 1180, 930, 870, 611, 0],
        canceled:  (function(){ const r=[0.34,0.24,0.40,0.18,0.36,0.28,0.30,0.16,0.45,0.33,0.21,0.12]; return [840,1050,835,920,920,1040,955,1180,930,870,611,0].map((v,i)=>Math.round(v*r[i])); })(),
        revenue:   (function(){
          const c=[840,1050,835,920,920,1040,955,1180,930,870,611,0];
          const price=[180,200,170,190,210,175,185,205,180,165,190,150];
          return c.map((v,i)=> Math.round(v*price[i]));
        })()
      }
    },
    // Percentuais (somam ~100%) para compor o funil
    categories: [
      { name: "Processadores", percent: 27 },
      { name: "Placas de vídeo", percent: 23 },
      { name: "Placas-mãe", percent: 17 },
      { name: "Memórias RAM", percent: 12 },
      { name: "Armazenamento", percent: 9 },
      { name: "Fontes", percent: 6 },
      { name: "Coolers", percent: 4 },
      { name: "Outros", percent: 2 }
    ]
  },
  "/api/reports/2024": {
    months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    // Total concluído do ano: 28.956
    marketplaces: {
      "Amazon": {
        completed: [690, 720, 865, 730, 740, 940, 790, 710, 975, 745, 685, 743],
        canceled:  (function(){ const r=[0.36,0.28,0.22,0.46,0.24,0.20,0.34,0.38,0.18,0.30,0.25,0.27]; return [690,720,865,730,740,940,790,710,975,745,685,743].map((v,i)=>Math.round(v*r[i])); })(),
        revenue:   (function(){
          const c=[690,720,865,730,740,940,790,710,975,745,685,743];
          const price=[205,180,195,160,175,210,188,170,220,165,172,182];
          return c.map((v,i)=> Math.round(v*price[i]));
        })()
      },
      "Shopee": {
        completed: [830, 740, 760, 905, 790, 800, 980, 840, 810, 940, 770, 656],
        canceled:  (function(){ const r=[0.30,0.66,0.26,0.22,0.40,0.29,0.24,0.20,0.35,0.27,0.23,0.32]; return [830,740,760,905,790,800,980,840,810,940,770,656].map((v,i)=>Math.round(v*r[i])); })(),
        revenue:   (function(){
          const c=[830,740,760,905,790,800,980,840,810,940,770,656];
          const price=[125,115,140,135,130,150,145,128,138,152,132,120];
          return c.map((v,i)=> Math.round(v*price[i]));
        })()
      },
      "Mercado Livre": {
        completed: [720, 915, 705, 780, 920, 760, 820, 1010, 720, 780, 980, 692],
        canceled:  (function(){ const r=[0.42,0.24,0.48,0.20,0.34,0.44,0.22,0.18,0.40,0.33,0.21,0.36]; return [720,915,705,780,920,760,820,1010,720,780,980,692].map((v,i)=>Math.round(v*r[i])); })(),
        revenue:   (function(){
          const c=[720,915,705,780,920,760,820,1010,720,780,980,692];
          const price=[170,190,160,175,200,165,180,205,172,178,198,155];
          return c.map((v,i)=> Math.round(v*price[i]));
        })()
      }
    },
    categories: [
      { name: "Processadores", percent: 24 },
      { name: "Placas de vídeo", percent: 22 },
      { name: "Placas-mãe", percent: 18 },
      { name: "Memórias RAM", percent: 13 },
      { name: "Armazenamento", percent: 9 },
      { name: "Fontes", percent: 7 },
      { name: "Coolers", percent: 4 },
      { name: "Outros", percent: 3 }
    ]
  },
  "/api/reports/2023": {
    months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    // Total concluído do ano: 27.896
    marketplaces: {
      "Amazon": {
        completed: [700, 700, 820, 720, 730, 900, 760, 780, 930, 710, 720, 790],
        canceled:  (function(){ const r=[0.45,0.40,0.26,0.20,0.34,0.24,0.38,0.32,0.18,0.42,0.28,0.30]; return [700,700,820,720,730,900,760,780,930,710,720,790].map((v,i)=>Math.round(v*r[i])); })(),
        revenue:   (function(){
          const c=[700,700,820,720,730,900,760,780,930,710,720,790];
          const price=[198,175,190,165,170,205,180,185,210,168,172,188];
          return c.map((v,i)=> Math.round(v*price[i]));
        })()
      },
      "Shopee": {
        completed: [680, 870, 740, 860, 770, 780, 940, 820, 790, 900, 740, 516],
        canceled:  (function(){ const r=[0.34,0.22,0.50,0.18,0.30,0.41,0.24,0.20,0.36,0.33,0.25,0.38]; return [680,870,740,860,770,780,940,820,790,900,740,516].map((v,i)=>Math.round(v*r[i])); })(),
        revenue:   (function(){
          const c=[680,870,740,860,770,780,940,820,790,900,740,516];
          const price=[120,140,125,135,130,160,145,138,150,142,128,118];
          return c.map((v,i)=> Math.round(v*price[i]));
        })()
      },
      "Mercado Livre": {
        completed: [800, 720, 690, 760, 880, 740, 800, 970, 750, 760, 940, 420],
        canceled:  (function(){ const r=[0.22,0.36,0.34,0.48,0.26,0.45,0.30,0.24,0.32,0.55,0.21,0.39]; return [800,720,690,760,880,740,800,970,750,760,940,420].map((v,i)=>Math.round(v*r[i])); })(),
        revenue:   (function(){
          const c=[800,720,690,760,880,740,800,970,750,760,940,420];
          const price=[185,160,155,170,195,168,178,200,172,176,192,140];
          return c.map((v,i)=> Math.round(v*price[i]));
        })()
      }
    },
    categories: [
      { name: "Processadores", percent: 23 },
      { name: "Placas de vídeo", percent: 21 },
      { name: "Placas-mãe", percent: 17 },
      { name: "Memórias RAM", percent: 13 },
      { name: "Armazenamento", percent: 10 },
      { name: "Fontes", percent: 7 },
      { name: "Coolers", percent: 5 },
      { name: "Outros", percent: 4 }
    ]
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
