import React, { useState, useEffect } from "react";
import BarraLateral from "./BarraLateral";
import BarraSuperior from "./BarraSuperior";
import "../../styles/dashboard_styles/dashboard.css";
import "../../styles/dashboard_styles/produtos.css";

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

  const categorias = ["Placas-mãe", "Processadores", "Placas de vídeo", "Memórias RAM", "Armazenamento"];
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

  const initialProducts = [
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
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  const [filters, setFilters] = useState({
    categoria: "Todos os Categorias",
    preco: "Todos os preços",
    marcador: "Nenhum"
  });

  const nextId = Math.max(...products.map(p => p.id)) + 1;

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    // fetch('/api/produtos', { method: 'POST', body: JSON.stringify(newProduct) });
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
        <div className="main-content">
          <div className="cabecalho-produtos">
            <div className="grupo-filtro">
              <label>Categoria:</label>
              <select
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
              </select>
            </div>
            <div className="grupo-filtro">
              <label>Preço:</label>
              <select
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
              <label>Marcador:</label>
              <select
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
            <button className="botao-filtro" onClick={applyFilters}>Filtrar</button>
            {(filters.categoria !== "Todos os Categorias" || filters.preco !== "Todos os preços" || filters.marcador !== "Nenhum") && (
              <button className="botao-limpar-filtro" onClick={clearFilters}>Limpar Filtro</button>
            )}
          </div>
          <div className="produtos-table-container">
            <table className="produtos-table">
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
          </div>
          <div className="produtos-footer">
            <button className="add-button" onClick={() => setIsModalOpen(true)}>Adicionar Produto</button>
            <div className="pagination">
              <button className="page-button" onClick={goToPreviousPage} disabled={currentPage === 1}>{'<'}</button>
              <span className="page-info">{currentPage} de {totalPages}</span>
              <button className="page-button" onClick={goToNextPage} disabled={currentPage === totalPages}>{'>'}</button>
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
