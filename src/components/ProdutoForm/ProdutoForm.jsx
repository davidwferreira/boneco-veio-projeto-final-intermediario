// src/components/ProdutoForm/ProdutoForm.jsx
import React from "react";
import { useProdutoForm } from "../../hooks/useProdutoForm";
import { Snackbar, Alert } from "@mui/material";
import styles from "./ProdutoForm.module.css";

/**
 * Formulário visual reutilizável para cadastro e edição de produtos.
 * Usa um hook para controlar os campos, validações e feedbacks.
 */
export default function ProdutoForm({
  initialData,            // Dados do produto (para edição)
  onSubmit: aoEnviar,     // Função chamada ao enviar
  onCancel,               // Função chamada ao cancelar/fechar
  modoEdicao = false,     // Modo de edição ou cadastro
  onSubmitCallback,       // Callback após o envio do formulário
}) {
  const {
    dadosFormulario,
    previewImagem,
    enviando,
    mensagemFeedback,
    lidarComMudanca,
    calcularPrecoComDesconto,
    enviarFormulario,
    fecharSnackbar,
    
  } = useProdutoForm({ initialData, modoEdicao, onSubmitCallback});

  return (
    <form
      className={styles.formCard}
      onSubmit={(evento) => {
        evento.preventDefault();           // Impede reload da página
        enviarFormulario(aoEnviar, onSubmitCallback);   // Envia os dados formatados
      }}
    >
      <h2 className={styles.formTitle}>
        {modoEdicao ? "Editar Produto" : "Cadastrar Produto"}
      </h2>

      {/* Imagem: Upload (cadastro) ou URL (edição) */}
      {!modoEdicao && (
        <input
          type="file"
          name="imagemArquivo"
          onChange={lidarComMudanca}
          className={styles.input}
        />
      )}

      {modoEdicao && (
        <input
          type="text"
          name="imagemUrl"
          value={dadosFormulario.imagemUrl}
          onChange={lidarComMudanca}
          placeholder="Imagem (URL)"
          className={styles.input}
        />
      )}

      {previewImagem && (
        <img
          src={previewImagem}
          alt="Pré-visualização"
          className={styles.imagePreview}
        />
      )}

      {/* Título e descrição */}
      <input
        type="text"
        name="titulo"
        value={dadosFormulario.titulo}
        onChange={lidarComMudanca}
        placeholder="Título"
        className={styles.input}
      />

      <textarea
        name="descricao"
        value={dadosFormulario.descricao}
        onChange={lidarComMudanca}
        placeholder="Descrição"
        rows="3"
        className={styles.textarea}
      />

      {/* Preço e desconto */}
      <input
        type="number"
        name="preco"
        value={dadosFormulario.preco}
        onChange={lidarComMudanca}
        placeholder="Preço"
        className={styles.input}
      />

      <input
        type="number"
        name="desconto"
        value={dadosFormulario.desconto}
        onChange={lidarComMudanca}
        placeholder="Desconto (%)"
        className={styles.input}
      />

      <div className={styles.resultadoBox}>
        <span>Preço com Desconto:</span>
        <strong>{calcularPrecoComDesconto()}</strong>
      </div>

      {/* Avaliação */}
      <div className={styles.sliderBox}>
        <label>Nota</label>
        <input
          type="range"
          name="nota"
          min="0"
          max="5"
          step="1"
          value={dadosFormulario.nota}
          onChange={lidarComMudanca}
          className={styles.slider}
        />
      </div>

      {/* Checkboxes */}
      <div className={styles.checkboxBox}>
        <label>
          <input
            type="checkbox"
            name="ehNovo"
            checked={dadosFormulario.ehNovo}
            onChange={lidarComMudanca}
          />
          É novidade?
        </label>

        <label>
          <input
            type="checkbox"
            name="favorito"
            checked={dadosFormulario.favorito}
            onChange={lidarComMudanca}
          />
          Favorito
        </label>
      </div>

      {/* Botões */}
      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={enviando}
        >
          {enviando
            ? "Salvando..."
            : modoEdicao
            ? "Salvar Alterações"
            : "Cadastrar"}
        </button>

        {onCancel && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Feedback com Snackbar */}
      <Snackbar
        open={mensagemFeedback.open}
        autoHideDuration={3000}
        onClose={fecharSnackbar}
      >
        <Alert
          onClose={fecharSnackbar}
          severity={mensagemFeedback.severity}
        >
          {mensagemFeedback.message}
        </Alert>
      </Snackbar>
    </form>
  );
}
