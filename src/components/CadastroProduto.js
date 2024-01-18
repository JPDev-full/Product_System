// src/components/CadastroProduto.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CadastroProduto.css';

const CadastroProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showProdutos, setShowProdutos] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  };

  const handleAddProduto = async () => {
    try {
      await axios.post('http://localhost:3001/produtos', {
        nome,
        descricao,
        preco,
      });
      setNome('');
      setDescricao('');
      setPreco('');
      fetchData();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const handleEditProduto = (id) => {
    setEditingId(id);
  };

  const handleUpdateProduto = async () => {
    try {
      await axios.put(`http://localhost:3001/produtos/${editingId}`, {
        nome,
        descricao,
        preco,
      });
      setNome('');
      setDescricao('');
      setPreco('');
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  const handleDeleteProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/produtos/${id}`);
      fetchData();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Produtos</h2>
      <div>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div>
        <label>Descrição:</label>
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>
      <div>
        <label>Preço:</label>
        <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} />
      </div>
      {editingId ? (
        <div>
          <button onClick={handleUpdateProduto}>Atualizar Produto</button>
          <button onClick={() => setEditingId(null)}>Cancelar</button>
        </div>
      ) : (
        <button onClick={handleAddProduto}>Adicionar Produto</button>
      )}
      <button onClick={() => setShowProdutos(!showProdutos)}>
        {showProdutos ? 'Ocultar Produtos' : 'Listar Produtos'}
      </button>
      {showProdutos && produtos.length > 0 && (
        <div>
          <h3>Produtos Cadastrados:</h3>
          {produtos.map((produto) => (
            <div className="item-box" key={produto.id}>
              <div>
                <strong>Nome:</strong> {produto.nome}
              </div>
              <div>
                <strong>Descrição:</strong> {produto.descricao}
              </div>
              <div>
                <strong>Preço:</strong> R$ {produto.preco}
              </div>
              <button onClick={() => handleEditProduto(produto.id)} disabled={editingId !== null}>
                Editar
              </button>
              <button onClick={() => handleDeleteProduto(produto.id)}>Excluir</button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CadastroProduto;