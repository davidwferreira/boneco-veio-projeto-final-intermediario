import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProdutoForm from "../../components/ProdutoForm/ProdutoForm";
import useProdutos from "../../hooks/useProdutos";
import { getProdutoPorId } from "../../services/produtoService";
import Carregar from "../Detalhes/Carregar";

export default function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { editarProduto, carregarProdutos } = useProdutos();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    getProdutoPorId(id)
      .then((dados) => {
        setProduto(dados);
        setCarregando(false);
      })
      .catch(() => {
        navigate("/");
      });
  }, [id]);

  const handleSubmit = async (produtoData) => {
    try {
      await editarProduto(id, produtoData);
      await carregarProdutos();
      navigate("/produtos", {
        state: { mensagem: "Produto atualizado com sucesso!", tipo: "success" },
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
      // O feedback já é tratado no hook via Snackbar
    }
  };

  if (carregando) return <Carregar />;

  return (
    <div style={{ padding: "2rem" }}>
      <ProdutoForm
        initialData={produto}
        modoEdicao={true}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/produtos")}
      />
    </div>
  );
}
