import React, { useState, useCallback } from "react";
import CardDisplay from "../CardDisplay/CardDisplay";
import ModalProduto from "../Modal/ModalProduto";
import { Snackbar, Alert } from "@mui/material";
import ErrorBoundary from "../ErrorBoundary";
import useProdutos from "../../hooks/useProdutos";
import styles from "./Prateleira.module.css";

/**
 * Componente principal da tela de prateleira de produtos.
 * Gerencia modais, ações nos produtos e renderização de cards.
 */
export default function Prateleira() {
  const {
    produtos,
    adicionarProduto,
    editarProduto,
    deletarProduto,
    carregarProdutos,
  } = useProdutos();

  // Controle dos modais (cadastro e edição)
  const [produtoEditando, setProdutoEditando] = useState(undefined);
  const [modoCadastro, setModoCadastro] = useState(false);

  // Feedback visual ao usuário (mensagens de sucesso/erro)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  /**
   * Exibe uma mensagem no snackbar.
   */
  const mostrarSnackbar = (mensagem, tipo = "success") => {
    setSnackbar({
      open: true,
      message: mensagem,
      severity: tipo,
    });
  };

  /**
   * Fecha o snackbar.
   */
  const handleFecharSnackbar = () => {
    setSnackbar((estadoAnterior) => ({ ...estadoAnterior, open: false }));
  };

  /**
   * Abre o modal de cadastro.
   */
  const handleAdicionarClick = () => {
    setModoCadastro(true);
  };

  /**
   * Fecha qualquer modal e recarrega os produtos.
   */
  const fecharModalEAtualizar = () => {
    setModoCadastro(false);
    setProdutoEditando(undefined);
    carregarProdutos();
  };

  /**
   * Inicia o modo de edição com o produto selecionado.
   */
  const handleEditarProduto = useCallback((produto) => {
    setProdutoEditando(produto);
  }, []);

  /**
   * Exclui o produto e remove ele da prateleira.
   */
  const handleExcluirProduto = async (idProduto) => {
    try {
      await deletarProduto(idProduto); // já atualiza o estado
      mostrarSnackbar("Produto excluído com sucesso.");
    } catch (erro) {
      mostrarSnackbar("Erro ao excluir produto.", "error");
    }
  };

  /**
   * Alterna o estado de favorito do produto de forma rápida e salva no backend.
   */
  const handleAlternarFavorito = async (idProduto) => {
    const produtoEncontrado = produtos.find(
      (produto) => produto.id === idProduto
    );
    if (!produtoEncontrado) return;

    const produtoAtualizado = {
      ...produtoEncontrado,
      isFavorite: !produtoEncontrado.isFavorite,
    };
    try {
      // Atualiza o backend e o estado local
      await editarProduto(idProduto, produtoAtualizado);
    } catch (erro) {
      mostrarSnackbar("Erro ao favoritar produto.", "error");
    }
  };

  /**
   * Atualiza a nota do produto de forma rápida e salva no backend.
   */
  const handleAlterarNota = async (idProduto, novaNota) => {
    const produtoEncontrado = produtos.find(
      (produto) => produto.id === idProduto
    );
    if (!produtoEncontrado) return;

    const produtoAtualizado = {
      ...produtoEncontrado,
      rating: novaNota,
    };

    // Atualização rápida local e pesistente no backend
    try {
      await editarProduto(idProduto, produtoAtualizado);
    } catch (erro) {
      mostrarSnackbar("Erro ao avaliar o produto.", "error");
    }
  };

  return (
    <ErrorBoundary>
      {/* Cabeçalho com botão de adicionar produto */}
      <div className={styles.header}>
        <button className={styles.btnAdicionar} onClick={handleAdicionarClick}>
          + Adicionar Produto
        </button>
      </div>

      {/* Lista de produtos renderizados */}
      <div className={styles.container}>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <CardDisplay
              key={produto.id}
              {...produto}
              onEditClick={() => handleEditarProduto(produto)}
              onDeleteClick={() => handleExcluirProduto(produto.id)}
              onToggleFavorite={() => handleAlternarFavorito(produto.id)}
              onSetRating={(valor) => handleAlterarNota(produto.id, valor)}
              onBuyClick={() => console.log("Comprar clicado")}
              onCartClick={() => console.log("Adicionar ao carrinho clicado")}
            />
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>

      {/* Feedback visual via snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleFecharSnackbar}
      >
        <Alert onClose={handleFecharSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Modal de cadastro de produto */}
      {modoCadastro && (
        <ModalProduto
          modoEdicao={false}
          onClose={fecharModalEAtualizar}
          onSave={fecharModalEAtualizar}
          adicionarProduto={adicionarProduto}
          editarProduto={editarProduto}
          carregarProdutos={carregarProdutos}
          mostrarSnackbar={mostrarSnackbar}
        />
      )}

      {/* Modal de edição de produto */}
      {produtoEditando && (
        <ModalProduto
          modoEdicao={true}
          produto={produtoEditando}
          onClose={fecharModalEAtualizar}
          onSave={fecharModalEAtualizar}
          adicionarProduto={adicionarProduto}
          editarProduto={editarProduto}
          carregarProdutos={carregarProdutos}
          mostrarSnackbar={mostrarSnackbar}
        />
      )}
    </ErrorBoundary>
  );
}
