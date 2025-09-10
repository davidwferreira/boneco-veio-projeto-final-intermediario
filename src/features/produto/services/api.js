import axios from "axios";

const API_URL = "http://localhost:3333"; 

export const listarProdutos = async () => {
  const response = await axios.get(`${API_URL}/produtos`);
  return response.data;
};

export const adicionarProduto = async (produto) => {
  const response = await axios.post(`${API_URL}/admin/produtos`, produto);
  return response.data;
};

export const atualizarProduto = async (id, produto) => {
  const response = await axios.put(`${API_URL}/admin/produtos/${id}`, produto);
  return response.data;
};

export const removerProduto = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/produtos/${id}`);
  return response.data;
};
