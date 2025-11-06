import React, { useState, useEffect } from "react";
import mockFetch from "../../mocks/dashboardMocks";
import DatePicker from "react-datepicker";
import "../../styles/pages/dashboard/dashboard.css";
import "../../styles/pages/dashboard/pedidos.css";
import "react-datepicker/dist/react-datepicker.css";
import { useSrOptimized, srProps } from "../../utils/useA11y";
import { notifySuccess, notifyError } from "../../utils/notify";

const Pedidos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ dataEmissao: null, dataEntrega: null, marketplace: "", pagamento: "Dinheiro", status: "Pendente" });
  const [observation, setObservation] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const srOpt = useSrOptimized();
  const [filters, setFilters] = useState({
    search: "",
    period: [null, null],
    marketplace: "Todos",
    status: "Todos",
  });

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  useEffect(() => {
    mockFetch('/api/pedidos')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (data && data.orders) setOrders(data.orders);
        else setOrders([]);
      })
      .catch(() => {
        setOrders([]);
      });
  }, []);

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
    notifySuccess(`Observação salva para o pedido #${selectedOrder.id}.`);
    closeModal();
  };

  // Utilities
  const toBR = (d) => {
    if (!d) return "";
    const dd = new Date(d);
    if (Number.isNaN(dd.getTime())) return "";
    const day = String(dd.getDate()).padStart(2, '0');
    const mon = String(dd.getMonth() + 1).padStart(2, '0');
    const yr = dd.getFullYear();
    return `${day}/${mon}/${yr}`;
  };
  const nextOrderId = () => {
    const ids = orders.map(o => Number(o.id) || 0);
    const max = ids.length ? Math.max(...ids) : 0;
    return max + 1;
  };
  const openAdd = () => {
    setNewOrder({ dataEmissao: null, dataEntrega: null, marketplace: "", pagamento: "Dinheiro", status: "Pendente" });
    setAddOpen(true);
  };
  const cancelAdd = () => setAddOpen(false);
  const confirmAdd = () => {
    if (!newOrder.dataEmissao) {
      notifyError('Data de emissão é obrigatória.');
      return;
    }
    const order = {
      id: nextOrderId(),
      dataEmissao: toBR(newOrder.dataEmissao),
      dataEntrega: newOrder.dataEntrega ? toBR(newOrder.dataEntrega) : "",
      marketplace: newOrder.marketplace || "-",
      pagamento: newOrder.pagamento,
      status: newOrder.status,
    };
    const updated = [order, ...orders];
    setOrders(updated);
    setTimeout(() => applyFilters(), 0);
  setAddOpen(false);
  notifySuccess(`Pedido #${order.id} adicionado.`);
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
    <div {...srProps(srOpt, { role: 'main', 'aria-label': 'Lista de pedidos' })}>
          <div className="pedidos-header">
            <div className="filter-group">
              <label htmlFor="filtro-pedido">Nº Pedido:</label>
              <input
                type="text"
                className="filter-search"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                id="filtro-pedido"
                placeholder="Buscar por Nº Pedido"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="filtro-periodo">Período:</label>
              <DatePicker
                className="filter-date-range"
                id="filtro-periodo"
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
              <label htmlFor="filtro-loja">Lojas:</label>
              <select
                className="filter-select"
                value={filters.marketplace}
                id="filtro-loja"
                onChange={(e) => handleFilterChange("marketplace", e.target.value)}
              >
                <option>Todos</option>
                <option>Mercado Livre</option>
                <option>Amazon</option>
                <option>Shopee</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filtro-status">Status:</label>
              <select
                className="filter-select"
                value={filters.status}
                id="filtro-status"
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option>Todos</option>
                <option>Pendente</option>
                <option>Enviado</option>
                <option>Entregue</option>
                <option>Cancelado</option>
              </select>
            </div>

            <button className="filter-button" onClick={applyFilters} {...srProps(srOpt, { 'aria-label': 'Aplicar filtros' })}>Filtrar</button>

            {(filters.search ||
              filters.period[0] ||
              filters.period[1] ||
              filters.marketplace !== "Todos" ||
              filters.status !== "Todos") && (
              <button className="clear-filter-button" onClick={clearFilters} {...srProps(srOpt, { 'aria-label': 'Limpar filtros' })}>
                Limpar Filtro
              </button>
            )}
          </div>

          <div className="pedidos-table-container" {...srProps(srOpt, { role: 'region', 'aria-label': 'Tabela de pedidos' })}>
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
                  <tr key={order.id} onClick={() => handleRowClick(order)} style={{ cursor: "pointer" }} {...srProps(srOpt, { 'aria-label': `Abrir detalhes do pedido ${order.id}` })}>
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
            <button className="add-button" onClick={openAdd} {...srProps(srOpt, { 'aria-label': 'Adicionar pedido' })}>Adicionar Pedido</button>
            <div className="pagination">
              <button className="page-button" onClick={goToPreviousPage} disabled={currentPage === 1} {...srProps(srOpt, { 'aria-label': 'Página anterior' })}>
                {"<"}
              </button>
              <span className="page-info" {...srProps(srOpt, { 'aria-live': 'polite', 'aria-atomic': 'true' })}>{currentPage} de {totalPages}</span>
              <button className="page-button" onClick={goToNextPage} disabled={currentPage === totalPages} {...srProps(srOpt, { 'aria-label': 'Próxima página' })}>
                {">"}
              </button>
            </div>
          </div>
      
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

      {addOpen && (
        <div className="modal-overlay">
          <div className="modal-content" role="dialog" aria-modal="true" aria-label="Adicionar pedido">
            <h2>Novo Pedido</h2>
            <div className="form-group">
              <label>Nº do pedido</label>
              <input type="text" value={nextOrderId()} readOnly />
            </div>
            <div className="form-group">
              <label>Data de emissão (obrigatória)</label>
              <DatePicker
                selected={newOrder.dataEmissao}
                onChange={(d) => setNewOrder(v => ({ ...v, dataEmissao: d }))}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione a data"
              />
            </div>
            <div className="form-group">
              <label>Data de entrega (opcional)</label>
              <DatePicker
                selected={newOrder.dataEntrega}
                onChange={(d) => setNewOrder(v => ({ ...v, dataEntrega: d }))}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione a data"
                isClearable
              />
            </div>
            <div className="form-group">
              <label>Marketplace</label>
              <input type="text" value={newOrder.marketplace} onChange={(e) => setNewOrder(v => ({ ...v, marketplace: e.target.value }))} placeholder="Ex.: Mercado Livre" />
            </div>
            <div className="form-group">
              <label>Pagamento</label>
              <select value={newOrder.pagamento} onChange={(e) => setNewOrder(v => ({ ...v, pagamento: e.target.value }))}>
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Boleto</option>
                <option>Pix</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status atual</label>
              <select value={newOrder.status} onChange={(e) => setNewOrder(v => ({ ...v, status: e.target.value }))}>
                <option>Pendente</option>
                <option>Entregue</option>
                <option>Cancelado</option>
                <option>Reembolsado</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button className="botao-cancelar" onClick={cancelAdd}>Cancelar</button>
              <button className="botao-adicionar" onClick={confirmAdd}>Adicionar Pedido</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
