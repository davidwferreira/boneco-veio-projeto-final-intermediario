// src/components/Prateleira/Prateleira.jsx
import React, { useState, useCallback, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import CardDisplay from "../CardDisplay/CardDisplay";
import useProdutos from "../../hooks/useProdutos";
import styles from "./Prateleira.module.css";
import { useCart } from "../../../../context/CartContext";

export default function Prateleira() {
  const navigate = useNavigate();
  const location = useLocation();
  const { produtos, editarProduto, deletarProduto } = useProdutos();
  const { addToCart } = useCart();

  // Estado local do snackbar para mensagens de sucesso ou erro
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Exibe o snackbar com mensagem e tipo (sucesso ou erro)
  const exibirSnackbar = (mensagem, tipo = "success") => {
    setSnackbar({ open: true, message: mensagem, severity: tipo });
  };

  // Fecha o snackbar após o tempo ou ao clicar no botão de fechar
  const handleFecharSnackbar = () => {
    setSnackbar((estadoAnterior) => ({ ...estadoAnterior, open: false }));
  };

  // Exibe snackbar se mensagem for passada via estado da navegação (location.state)
  useEffect(() => {
    const handleMensagemDeRota = () => {
      if (location.state?.mensagem) {
        exibirSnackbar(location.state.mensagem);
        // Evita exibir a mesma mensagem ao voltar para a rota
        window.history.replaceState({}, document.title);
      }
    };

    handleMensagemDeRota();
  }, [location.state]);

  // Navega para a rota de cadastro de novo produto
  const handleAdicionarClick = useCallback(() => {
    navigate("/produto/novo");
  }, [navigate]);

  // Navega para a página de edição do produto
  const handleEditarProduto = useCallback(
    (produtoId) => {
      navigate(`/produto/editar/${produtoId}`);
    },
    [navigate]
  );

  // Remove produto e exibe feedback
  const handleExcluirProduto = useCallback(
    async (idProduto) => {
      try {
        await deletarProduto(idProduto);
        exibirSnackbar("Produto excluído com sucesso.");
      } catch {
        exibirSnackbar("Erro ao excluir produto.", "error");
      }
    },
    [deletarProduto]
  );

  // Atualiza dados de um produto e exibe mensagem personalizada
  const atualizarProduto = useCallback(
    async (idProduto, novosDados, { sucesso, erro }) => {
      try {
        await editarProduto(idProduto, novosDados);
        exibirSnackbar(sucesso);
      } catch {
        exibirSnackbar(erro, "error");
      }
    },
    [editarProduto]
  );

  // Alterna estado de favorito do produto
  const handleAlternarFavorito = useCallback(
    (idProduto) => {
      const produto = produtos.find((p) => p.id === idProduto);
      if (produto) {
        atualizarProduto(
          idProduto,
          { ...produto, isFavorite: !produto.isFavorite },
          {
            sucesso: "Favorito atualizado!",
            erro: "Erro ao favoritar produto.",
          }
        );
      }
    },
    [produtos, atualizarProduto]
  );

  // Atualiza a nota do produto (rating)
  const handleAlterarNota = useCallback(
    (idProduto, novaNota) => {
      const produto = produtos.find((p) => p.id === idProduto);
      if (produto) {
        atualizarProduto(
          idProduto,
          { ...produto, rating: novaNota },
          {
            sucesso: "Nota atualizada!",
            erro: "Erro ao avaliar o produto.",
          }
        );
      }
    },
    [produtos, atualizarProduto]
  );

  return (
    <>
      {/* Botão para adicionar novo produto */}
      <div className={styles.header}>
        <button className={styles.btnAdicionar} onClick={handleAdicionarClick}>
          + Adicionar Produto
        </button>
      </div>

      {/* Lista de produtos */}
      <div className={styles.container}>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <CardDisplay
              key={produto.id}
              {...produto}
              onEditClick={() => handleEditarProduto(produto.id)}
              onDeleteClick={() => handleExcluirProduto(produto.id)}
              onToggleFavorite={() => handleAlternarFavorito(produto.id)}
              onSetRating={(valor) => handleAlterarNota(produto.id, valor)}
              onBuyClick={() => console.log("Comprar clicado")}
              onCartClick={() => addToCart(produto)}
            />
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>

      {/* Snackbar de feedback visual */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleFecharSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleFecharSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
