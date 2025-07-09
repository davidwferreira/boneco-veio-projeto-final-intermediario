import React from "react";
import { useNavigate } from "react-router-dom";
import ProdutoForm from "../../components/ProdutoForm/ProdutoForm";
import useProdutos from "../../hooks/useProdutos";

export default function CadastrarProduto() {
  const navigate = useNavigate();
  const { adicionarProduto, carregarProdutos } = useProdutos();

  const handleSubmit = async (produtoData) => {
    try {
      await adicionarProduto(produtoData);
      await carregarProdutos();
    } catch (error) {
      alert("Erro ao cadastrar produto.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <ProdutoForm
        modoEdicao={false}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}
