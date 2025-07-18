import React from "react";
import iracemas from "../../../src/assets/image/7.webp"
import patrulha from "../../../src/assets/image/10.webp"
import padre from "../../../src/assets/image/11.webp"
import { Link } from "react-router-dom";
import styli from "../HomeSection2/HomeSection2.module.css"; 
import Section from "../../../src/components/Section/Section";

function Destaque() {
  const destaqueCardsData = [
    {
      desconto: "30% OFF",
      titulo: "Iracema",
      imagemSrc: iracemas,
      altImagem: "imagem iracema",
      textoBotao: "Comprar",
    },
    {
      desconto: "30% OFF",
      titulo: "Patrulha",
      imagemSrc: patrulha,
      altImagem: "imagem da patrulha",
      textoBotao: "Comprar",
    },
    {
      desconto: "30% OFF",
      titulo: "Padre Cicero",
      imagemSrc: padre,
      altImagem: "imagem de padre cicero",
      textoBotao: "Comprar",
    },
  ];

  return (
    <Section title='Promoções' titleAlign='center' link={true}>
      <div className={styli.containerDestaque}>
        {destaqueCardsData.map((cardData, index) => (
          <div
            key={index}
            className={styli.cardDestaque}
          >
            <p className={styli.descontoTag}>
              {cardData.desconto}
            </p>
            <h2 className={styli.tituloCard}>
              {cardData.titulo}
            </h2>
            <img
              src={cardData.imagemSrc}
              alt={cardData.altImagem}
              className={styli.imagemCard}
            />
            <Link to="/notfound">
              <button className={styli.botaoComprar}>
                {cardData.textoBotao}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Destaque;