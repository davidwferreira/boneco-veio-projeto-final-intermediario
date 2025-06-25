import React from "react";
import ProdutoForm from "../ProdutoForm/ProdutoForm";
import styles from "./ModalProduto.module.css";

/**
 * Modal unificado para cadastro e edição de produtos.
 * Determina o comportamento com base em `modoEdicao`.
 */
export default function ModalProduto({
  produto = null,         // Objeto do produto (modo edição) ou null (modo cadastro)
  modoEdicao = false,     // Define se é edição ou cadastro
  onClose,                // Função para fechar o modal
  onSave,                 // Função para fechar após salvar com sucesso
  adicionarProduto,       // Função do hook para adicionar
  editarProduto,          // Função do hook para editar
  carregarProdutos,       // Função para recarregar a lista
  mostrarSnackbar, // Função para mostrar snackbar (feedback)
}) {
  const handleSubmit = async (produtoData) => {
    if (modoEdicao) {
      await editarProduto(produto.id, produtoData);
    } else {
      await adicionarProduto(produtoData);
    }

    await carregarProdutos();
    onSave?.(); // Fecha o modal
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>

        <ProdutoForm
          initialData={modoEdicao ? produto : null}
          modoEdicao={modoEdicao}
          onSubmit={handleSubmit}
          onCancel={onClose}
          onSubmitCallback={mostrarSnackbar}
        />
      </div>
    </div>
  );
}
