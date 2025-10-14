import React, { useState } from "react";
import BarraLateral from "./BarraLateral";
import BarraSuperior from "./BarraSuperior";
import "../../styles/dashboard_styles/dashboard.css";
import "../../styles/dashboard_styles/produtos.css";

const Produtos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const initialProducts = [
    { id: 1, categoria: "Placas-mãe", marca: "ASUS", nome: "ROG Strix B550-F Gaming", estoque: 8, preco: "R$ 1.200,00", codigoBarras: "123456789", quantMerc: 4, marcador: "new" },
    { id: 2, categoria: "Placas de vídeo", marca: "NVIDIA", nome: "RTX 3080 Founders Edition", estoque: 12, preco: "R$ 5.500,00", codigoBarras: "987654321", quantMerc: 7, marcador: "promotion" },
    { id: 3, categoria: "Processadores", marca: "AMD", nome: "Ryzen 7 5800X", estoque: 15, preco: "R$ 2.800,00", codigoBarras: "456789123", quantMerc: 9, marcador: "new" },
    { id: 4, categoria: "Placas-mãe", marca: "MSI", nome: "B450 Tomahawk Max", estoque: 5, preco: "R$ 900,00", codigoBarras: "111222333", quantMerc: 3, marcador: "discontinued" },
    { id: 5, categoria: "Placas de vídeo", marca: "AMD", nome: "Radeon RX 6800 XT", estoque: 10, preco: "R$ 4.200,00", codigoBarras: "444555666", quantMerc: 6, marcador: "promotion" },
    { id: 6, categoria: "Processadores", marca: "Intel", nome: "Core i9-13900K", estoque: 6, preco: "R$ 3.500,00", codigoBarras: "777888999", quantMerc: 4, marcador: "new" },
    { id: 7, categoria: "Memórias RAM", marca: "Corsair", nome: "Vengeance RGB Pro 16GB (2x8GB) 3200MHz", estoque: 20, preco: "R$ 650,00", codigoBarras: "000111222", quantMerc: 12, marcador: "promotion" },
    { id: 8, categoria: "Armazenamento", marca: "Samsung", nome: "970 EVO Plus 1TB NVMe SSD", estoque: 18, preco: "R$ 800,00", codigoBarras: "333444555", quantMerc: 10, marcador: "new" },
    { id: 9, categoria: "Placas de vídeo", marca: "NVIDIA", nome: "RTX 4070 Ti", estoque: 7, preco: "R$ 6.800,00", codigoBarras: "666777888", quantMerc: 5, marcador: "new" },
    { id: 10, categoria: "Placas-mãe", marca: "Gigabyte", nome: "Z790 Aorus Elite AX", estoque: 9, preco: "R$ 1.500,00", codigoBarras: "999000111", quantMerc: 5, marcador: "promotion" },
    { id: 11, categoria: "Processadores", marca: "AMD", nome: "Ryzen 5 5600X", estoque: 14, preco: "R$ 1.600,00", codigoBarras: "222333444", quantMerc: 8, marcador: "discontinued" },
    { id: 12, categoria: "Memórias RAM", marca: "Kingston", nome: "HyperX Fury 32GB (2x16GB) 3600MHz", estoque: 11, preco: "R$ 1.100,00", codigoBarras: "555666777", quantMerc: 6, marcador: "new" },
    { id: 13, categoria: "Armazenamento", marca: "WD", nome: "Black SN850X 2TB NVMe SSD", estoque: 13, preco: "R$ 1.400,00", codigoBarras: "888999000", quantMerc: 7, marcador: "promotion" },
    { id: 14, categoria: "Placas de vídeo", marca: "AMD", nome: "Radeon RX 7900 XTX", estoque: 4, preco: "R$ 8.500,00", codigoBarras: "112233445", quantMerc: 2, marcador: "new" },
    { id: 15, categoria: "Placas-mãe", marca: "ASUS", nome: "Prime Z690-P", estoque: 16, preco: "R$ 1.100,00", codigoBarras: "556677889", quantMerc: 9, marcador: "discontinued" },
    { id: 16, categoria: "Processadores", marca: "Intel", nome: "Core i7-13700K", estoque: 10, preco: "R$ 2.900,00", codigoBarras: "990011122", quantMerc: 5, marcador: "promotion" },
    { id: 17, categoria: "Memórias RAM", marca: "G.Skill", nome: "Trident Z RGB 16GB (2x8GB) 4000MHz", estoque: 19, preco: "R$ 750,00", codigoBarras: "334455667", quantMerc: 11, marcador: "new" },
    { id: 18, categoria: "Armazenamento", marca: "Seagate", nome: "FireCuda 530 1TB SSD", estoque: 12, preco: "R$ 950,00", codigoBarras: "778899001", quantMerc: 7, marcador: "promotion" },
    { id: 19, categoria: "Placas de vídeo", marca: "NVIDIA", nome: "RTX 3060 Ti", estoque: 22, preco: "R$ 3.200,00", codigoBarras: "223344556", quantMerc: 13, marcador: "discontinued" },
    { id: 20, categoria: "Placas-mãe", marca: "MSI", nome: "MAG B660M Mortar WiFi", estoque: 17, preco: "R$ 950,00", codigoBarras: "667788990", quantMerc: 10, marcador: "new" },
  ];

  const [products, setProducts] = useState(initialProducts);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handleMarkerChange = (id, newMarker) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, marcador: newMarker } : product
    ));
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
          <div className="produtos-header">
            <select className="filter-select">
              <option>Todos os Categorias</option>
              <option>Eletrônicos</option>
              <option>Móveis</option>
              <option>Roupas</option>
            </select>
            <select className="filter-select">
              <option>Novo em Estoque</option>
              <option>Baixo Estoque</option>
              <option>Esgotado</option>
            </select>
            <select className="filter-select">
              <option>Marcadores</option>
              <option>Promoção</option>
              <option>Novo</option>
            </select>
            <button className="filter-button">Filtrar</button>
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
                  <th>Quant. Merc.</th>
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
                    <td>{product.quantMerc}</td>
                    <td>
                      <select
                        className={`marker ${product.marcador}`}
                        value={product.marcador}
                        onChange={(e) => handleMarkerChange(product.id, e.target.value)}
                      >
                        <option value=""></option>
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
            <button className="add-button">Adicionar Novo</button>
            <div className="pagination">
              <button className="page-button" onClick={goToPreviousPage} disabled={currentPage === 1}>{'<'}</button>
              <span className="page-info">{currentPage} de {totalPages}</span>
              <button className="page-button" onClick={goToNextPage} disabled={currentPage === totalPages}>{'>'}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Produtos;
