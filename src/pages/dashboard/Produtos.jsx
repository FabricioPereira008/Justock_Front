import React, { useState, useEffect } from "react";
import mockFetch from "../../mocks/dashboardMocks";
import BarraLateral from "../../components/dashboard/BarraLateral";
import BarraSuperior from "../../components/dashboard/BarraSuperior";
import "../../styles/pages/dashboard/dashboard.css";
import "../../styles/pages/dashboard/produtos.css";
import { useSrOptimized, srProps } from "../../utils/useA11y";

const ModalAdicionarProduto = ({ isOpen, onClose, onAddProduct, nextId }) => {
  const [formData, setFormData] = useState({
    categoria: "Placas-mãe",
    marca: "ASUS",
    nome: "",
    estoque: 0,
    preco: "",
    codigoBarras: "",
    marcador: "",
    customMarca: ""
  });

  const categorias = [
    "Placas-mãe",
    "Processadores",
    "Placas de vídeo",
    "Memórias RAM",
    "Armazenamento",
    "Fontes",
    "Coolers",
    "Outros"
  ];
  const marcas = ["ASUS", "NVIDIA", "AMD", "MSI", "Intel", "Corsair", "Samsung", "Gigabyte", "Kingston", "WD", "G.Skill", "Seagate", "Outras"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "marca" && value !== "Outras") {
      setFormData({ ...formData, [name]: value, customMarca: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalMarca = formData.marca === "Outras" ? formData.customMarca : formData.marca;
    const newProduct = {
      id: nextId,
      ...formData,
      marca: finalMarca,
      preco: `R$ ${formData.preco.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1,$2").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`,
      estoque: parseInt(formData.estoque)
    };
    onAddProduct(newProduct);
    onClose();
    setFormData({
      categoria: "Placas-mãe",
      marca: "ASUS",
      nome: "",
      estoque: 0,
      preco: "",
      codigoBarras: "",
      marcador: "",
      customMarca: ""
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Novo Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Categoria:</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} required>
              {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Marca:</label>
            <select name="marca" value={formData.marca} onChange={handleChange} required>
              {marcas.map(marca => <option key={marca} value={marca}>{marca}</option>)}
            </select>
            {formData.marca === "Outras" && (
              <input
                type="text"
                name="customMarca"
                value={formData.customMarca}
                onChange={handleChange}
                placeholder="Digite a marca"
                required
              />
            )}
          </div>
          <div className="form-group">
            <label>Nome do Produto:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Estoque:</label>
            <input type="number" name="estoque" value={formData.estoque} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Preço (R$):</label>
            <input type="text" name="preco" value={formData.preco} onChange={handleChange} placeholder="Ex: 1200,00" required />
          </div>
          <div className="form-group">
            <label>Código de Barras:</label>
            <input type="text" name="codigoBarras" value={formData.codigoBarras} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Marcador:</label>
            <select name="marcador" value={formData.marcador} onChange={handleChange}>
              <option value="">Nenhum</option>
              <option value="promotion">Promoção</option>
              <option value="new">Novo</option>
              <option value="discontinued">Descontinuado</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="botao-adicionar">Adicionar</button>
            <button type="button" onClick={onClose} className="botao-cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Produtos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const srOpt = useSrOptimized();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    mockFetch('/api/produtos')
      .then(res => res && typeof res.json === 'function' ? res.json() : res)
      .then(data => {
        if (data && data.products) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      })
      .catch(() => {
        if (typeof mockFetch === 'function') {
          mockFetch('/api/produtos').then(res => res && typeof res.json === 'function' ? res.json() : res).then(data => setProducts(data && data.products ? data.products : []));
        } else {
          setProducts([]);
        }
      });
  }, []);
  const [filters, setFilters] = useState({
    categoria: "Todos os Categorias",
    preco: "Todos os preços",
    marcador: "Nenhum"
  });

  const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleMarkerChange = (id, newMarker) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, marcador: newMarker } : product
    ));
  };

  const applyFilters = () => {
    let filtered = products;

    if (filters.categoria !== "Todos os Categorias") {
      filtered = filtered.filter(product => product.categoria === filters.categoria);
    }

    if (filters.preco !== "Todos os preços") {
      const priceRanges = {
        "R$10 - R$1000": [10, 1000],
        "R$1000 - R$2000": [1000, 2000],
        "R$2000 - R$3000": [2000, 3000],
        "R$3000 - R$4000": [3000, 4000],
        "R$3000 - R$5000": [3000, 5000],
        "R$5000+": [5000, Infinity]
      };
      const [min, max] = priceRanges[filters.preco];
      filtered = filtered.filter(product => {
        const price = parseFloat(product.preco.replace("R$ ", "").replace(".", "").replace(",", "."));
        return price >= min && price <= max;
      });
    }

    if (filters.marcador !== "Nenhum") {
      const markerMap = {
        "Promoção": "promotion",
        "Novo": "new",
        "Descontinuado": "discontinued"
      };
      const markerValue = markerMap[filters.marcador];
      filtered = filtered.filter(product => product.marcador === markerValue);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      categoria: "Todos os Categorias",
      preco: "Todos os preços",
      marcador: "Nenhum"
    });
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="painel-container">
      <BarraLateral />
      <main className="painel-principal">
        <BarraSuperior />
        <div className="main-content" {...srProps(srOpt, { role: 'main', 'aria-label': 'Lista de produtos' })}>
          <div className="cabecalho-produtos" {...srProps(srOpt, { role: 'region', 'aria-label': 'Filtros de produtos' })}>
            <div className="grupo-filtro">
              <label htmlFor="filtro-categoria">Categoria:</label>
              <select
                id="filtro-categoria"
                className="selecao-filtro"
                value={filters.categoria}
                onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
              >
                <option>Todos os Categorias</option>
                <option>Placas-mãe</option>
                <option>Processadores</option>
                <option>Placas de vídeo</option>
                <option>Memórias RAM</option>
                <option>Armazenamento</option>
                <option>Fontes</option>
                <option>Coolers</option>
                <option>Outros</option>
              </select>
            </div>
            <div className="grupo-filtro">
              <label htmlFor="filtro-preco">Preço:</label>
              <select
                id="filtro-preco"
                className="selecao-filtro"
                value={filters.preco}
                onChange={(e) => setFilters({ ...filters, preco: e.target.value })}
              >
                <option>Todos os preços</option>
                <option>R$10 - R$1000</option>
                <option>R$1000 - R$2000</option>
                <option>R$2000 - R$3000</option>
                <option>R$3000 - R$4000</option>
                <option>R$3000 - R$5000</option>
                <option>R$5000+</option>
              </select>
            </div>
            <div className="grupo-filtro">
              <label htmlFor="filtro-marcador">Marcador:</label>
              <select
                id="filtro-marcador"
                className="selecao-filtro"
                value={filters.marcador}
                onChange={(e) => setFilters({ ...filters, marcador: e.target.value })}
              >
                <option>Nenhum</option>
                <option>Promoção</option>
                <option>Novo</option>
                <option>Descontinuado</option>
              </select>
            </div>
            <button className="botao-filtro" onClick={applyFilters} {...srProps(srOpt, { 'aria-label': 'Aplicar filtros' })}>Filtrar</button>
            {(filters.categoria !== "Todos os Categorias" || filters.preco !== "Todos os preços" || filters.marcador !== "Nenhum") && (
              <button className="botao-limpar-filtro" onClick={clearFilters} {...srProps(srOpt, { 'aria-label': 'Limpar filtros' })}>Limpar Filtro</button>
            )}
          </div>
          <div className="produtos-table-container" {...srProps(srOpt, { role: 'region', 'aria-label': 'Tabela de produtos' })}>
            <table className="produtos-table" {...srProps(srOpt, { 'aria-describedby': 'produtos-legenda' })}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Categoria</th>
                  <th>Marca</th>
                  <th>Nome do Produto</th>
                  <th>Estoque</th>
                  <th>Preço</th>
                  <th>Código de Barras</th>
                  <th>Marcador</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.categoria}</td>
                    <td>{product.marca}</td>
                    <td>{product.nome}</td>
                    <td>{product.estoque}</td>
                    <td>{product.preco}</td>
                    <td>{product.codigoBarras}</td>
                    <td>
                      <select
                        className={`marker ${product.marcador}`}
                        value={product.marcador}
                        onChange={(e) => handleMarkerChange(product.id, e.target.value)}
                        {...srProps(srOpt, { 'aria-label': `Definir marcador do produto ${product.nome || product.id}` })}
                      >
                        <option value="">Nenhum</option>
                        <option value="promotion">Promoção</option>
                        <option value="new">Novo</option>
                        <option value="discontinued">Descontinuado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {srOpt && <p id="produtos-legenda" className="sr-only">Use as setas para navegar nas colunas, e a tecla Tab para acessar os controles por linha.</p>}
          </div>
          <div className="produtos-footer">
            <button className="add-button" onClick={() => setIsModalOpen(true)} {...srProps(srOpt, { 'aria-label': 'Adicionar novo produto' })}>Adicionar Produto</button>
            <div className="pagination">
              <button className="page-button" onClick={goToPreviousPage} disabled={currentPage === 1} {...srProps(srOpt, { 'aria-label': 'Página anterior' })}>{'<'}</button>
              <span className="page-info" {...srProps(srOpt, { 'aria-live': 'polite', 'aria-atomic': 'true' })}>{currentPage} de {totalPages}</span>
              <button className="page-button" onClick={goToNextPage} disabled={currentPage === totalPages} {...srProps(srOpt, { 'aria-label': 'Próxima página' })}>{'>'}</button>
            </div>
          </div>
        </div>
      </main>
      <ModalAdicionarProduto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
        nextId={nextId}
      />
    </div>
  );
};

export default Produtos;
