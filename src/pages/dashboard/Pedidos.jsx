import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import BarraLateral from "../../components/dashboard/BarraLateral";
import BarraSuperior from "../../components/dashboard/BarraSuperior";
import "../../styles/pages/dashboard/dashboard.css";
import "../../styles/pages/dashboard/pedidos.css";
import "react-datepicker/dist/react-datepicker.css";

const Pedidos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [observation, setObservation] = useState("");

  const initialOrders = [
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
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [filters, setFilters] = useState({
    search: "",
    period: [null, null],
    marketplace: "Todos",
    status: "Todos",
  });

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const applyFilters = () => {
    let filtered = orders;

    if (filters.search) {
      filtered = filtered.filter((order) => order.id.toString().includes(filters.search));
    }

    const [startDate, endDate] = filters.period;
    if (startDate) {
      const startStr = startDate.toISOString().split("T")[0];
      filtered = filtered.filter((order) => {
        if (!order.dataEmissao) return false;
        const [day, month, year] = order.dataEmissao.split('/');
        const orderDateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return orderDateStr >= startStr;
      });
    }
    if (endDate) {
      const endStr = endDate.toISOString().split("T")[0];
      filtered = filtered.filter((order) => {
        if (!order.dataEmissao) return false;
        const [day, month, year] = order.dataEmissao.split('/');
        const orderDateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return orderDateStr <= endStr;
      });
    }

    if (filters.marketplace !== "Todos") {
      filtered = filtered.filter((order) => order.marketplace === filters.marketplace);
    }
    if (filters.status !== "Todos") {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ search: "", period: [null, null], marketplace: "Todos", status: "Todos" });
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setObservation("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
    setObservation("");
  };

  const saveObservation = () => {
    alert(`Observação salva para o pedido #${selectedOrder.id}: ${observation}`);
    closeModal();
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleFilterChange = (key, value) => {
    if (key === "period") setFilters({ ...filters, period: value });
    else setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="painel-container">
      <BarraLateral />
      <main className="painel-principal">
        <BarraSuperior />
        <div className="main-content">
          <div className="pedidos-header">
            <div className="filter-group">
              <label>Nº Pedido:</label>
              <input
                type="text"
                className="filter-search"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Buscar por Nº Pedido"
              />
            </div>

            <div className="filter-group">
              <label>Período:</label>
              <DatePicker
                className="filter-date-range"
                selectsRange={true}
                startDate={filters.period[0]}
                endDate={filters.period[1]}
                onChange={(update) => handleFilterChange("period", update)}
                isClearable={true}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione o período"
              />
            </div>

            <div className="filter-group">
              <label>Lojas:</label>
              <select
                className="filter-select"
                value={filters.marketplace}
                onChange={(e) => handleFilterChange("marketplace", e.target.value)}
              >
                <option>Todos</option>
                <option>Mercado Livre</option>
                <option>Amazon</option>
                <option>Shopee</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Status:</label>
              <select
                className="filter-select"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option>Todos</option>
                <option>Pendente</option>
                <option>Enviado</option>
                <option>Entregue</option>
                <option>Cancelado</option>
              </select>
            </div>

            <button className="filter-button" onClick={applyFilters}>Filtrar</button>

            {(filters.search ||
              filters.period[0] ||
              filters.period[1] ||
              filters.marketplace !== "Todos" ||
              filters.status !== "Todos") && (
              <button className="clear-filter-button" onClick={clearFilters}>
                Limpar Filtro
              </button>
            )}
          </div>

          <div className="pedidos-table-container">
            <table className="pedidos-table">
              <thead>
                <tr>
                  <th>Nº Pedido</th>
                  <th>Data Emissão</th>
                  <th>Data Entrega</th>
                  <th>Marketplace</th>
                  <th>Pagamento</th>
                  <th>Status Atual</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id} onClick={() => handleRowClick(order)} style={{ cursor: "pointer" }}>
                    <td>{order.id}</td>
                    <td>{order.dataEmissao || "-"}</td>
                    <td>{order.dataEntrega || "-"}</td>
                    <td>{order.marketplace}</td>
                    <td>{order.pagamento}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pedidos-footer">
            <div className="pagination">
              <button className="page-button" onClick={goToPreviousPage} disabled={currentPage === 1}>
                {"<"}
              </button>
              <span className="page-info">{currentPage} de {totalPages}</span>
              <button className="page-button" onClick={goToNextPage} disabled={currentPage === totalPages}>
                {">"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {modalOpen && selectedOrder && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            border: "2px solid #007bff",
            width: "350px",
            maxHeight: "80%",
            overflowY: "auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }}>
            <h3 style={{ color: "#007bff", marginBottom: "15px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "18px", fontWeight: "bold" }}>Detalhes do Pedido #{selectedOrder.id}</h3>
            <p style={{ color: "black", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px" }}><strong>Data Emissão:</strong> {selectedOrder.dataEmissao || "-"}</p>
            <p style={{ color: "black", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px" }}><strong>Data Entrega:</strong> {selectedOrder.dataEntrega || "-"}</p>
            <p style={{ color: "black", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px" }}><strong>Marketplace:</strong> {selectedOrder.marketplace}</p>
            <p style={{ color: "black", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px" }}><strong>Pagamento:</strong> {selectedOrder.pagamento}</p>
            <p style={{ color: "black", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px" }}><strong>Status:</strong> {selectedOrder.status}</p>
            <div style={{ marginTop: "20px" }}>
              <label style={{ color: "black", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px" }}><strong>Observação:</strong></label>
              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Digite uma observação..."
                style={{
                  width: "100%",
                  height: "80px",
                  marginTop: "5px",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  resize: "vertical",
                  color: "black",
                  backgroundColor: "white",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontSize: "14px"
                }}
              />
            </div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={closeModal}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontSize: "14px"
                }}
              >
                Fechar
              </button>
              <button
                onClick={saveObservation}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontSize: "14px"
                }}
              >
                Salvar Observação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
