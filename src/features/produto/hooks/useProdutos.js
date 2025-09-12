import { useState, useEffect } from "react";
import {
  listarProdutos,
  // adicionarProduto as adicionarProdutoAPI,
  // atualizarProduto as atualizarProdutoAPI,
  // removerProduto as removerProdutoAPI,
} from "../services/api";

/**
 * Hook personalizado para gerenciar o estado e operações de produtos.
 */
const useProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  /**
   * Carrega todos os produtos do banco de dados e atualiza o estado.
   */
  const carregarProdutos = async () => {
    try {
      const produtosRecebidos = await listarProdutos();
      setProdutos(produtosRecebidos);
    } catch (erro) {
      console.error("Erro ao carregar produtos:", erro);
    }
  };

  /**
   * Adiciona um novo produto usando o serviço da API.
   * @param {Object} novoProduto - dados do novo produto
   */
  const adicionarProduto = async (novoProduto) => {
    try {
      const produtoAdicionado = await adicionarProdutoAPI(novoProduto);
      setProdutos((produtosAnteriores) => [
        ...produtosAnteriores,
        produtoAdicionado,
      ]);
    } catch (erro) {
      console.error("Erro ao adicionar produto:", erro);
      throw erro;
    }
  };

  /**
   * Atualiza os dados de um produto existente.
   * @param {string} id - ID do produto
   * @param {Object} dadosAtualizados - novos dados do produto
   */
  const editarProduto = async (id, dadosAtualizados) => {
    try {
      await atualizarProdutoAPI(id, dadosAtualizados);
      setProdutos((produtosAnteriores) =>
        produtosAnteriores.map((produtoAtual) =>
          produtoAtual.id === id
            ? { ...produtoAtual, ...dadosAtualizados }
            : produtoAtual
        )
      );
    } catch (erro) {
      console.error("Erro ao editar produto:", erro);
      throw erro;
    }
  };

  /**
   * Remove um produto do banco de dados e atualiza o estado local.
   * @param {string} id - ID do produto a ser removido
   */
  const deletarProduto = async (id) => {
    try {
      await removerProdutoAPI(id);
      setProdutos((produtosAnteriores) =>
        produtosAnteriores.filter((produto) => produto.id !== id)
      );
    } catch (erro) {
      console.error("Erro ao deletar produto:", erro);
      throw erro;
    }
  };

  // Carrega a lista de produtos ao inicializar
  useEffect(() => {
    carregarProdutos();
  }, []);

  return {
    produtos,
    carregarProdutos,
    adicionarProduto,
    editarProduto,
    deletarProduto,
  };
};

export default useProdutos;
