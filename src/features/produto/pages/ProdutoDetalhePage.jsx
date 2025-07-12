// src/pages/ProdutoDetalhePage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProdutoPorId } from "../services/produtoService";
import styles from "./ProdutoDetalhePage.module.css";

export default function ProdutoDetalhePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const dados = await getProdutoPorId(id);
        setProduto(dados);
      } catch (erro) {
        console.error("Produto não encontrado:", erro);
      } finally {
        setCarregando(false);
      }
    }

    fetchProduto();
  }, [id]);

  if (carregando) return <p>Carregando...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div className={styles.page}>
      <button onClick={() => navigate("/")}>← Voltar</button>

      <div className={styles.cardDetalhado}>
        <img
          src={produto.imageSrc}
          alt={produto.title}
          className={styles.imagemGrande}
        />

        <div className={styles.info}>
          <h1>{produto.title}</h1>
          <p>{produto.description}</p>
          <p>
            <strong>Preço:</strong> R$ {produto.price}
          </p>
          {produto.discount && (
            <p>
              <strong>Desconto:</strong> {produto.discount}%
            </p>
          )}
          {produto.rating && (
            <p>
              <strong>Avaliação:</strong> {produto.rating} estrelas
            </p>
          )}
          {produto.isNew && <p className={styles.chip}>Novidade</p>}
          {produto.isFavorite && <p className={styles.chip}>Favorito</p>}
        </div>
      </div>
    </div>
  );
}
