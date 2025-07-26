import React from 'react';
import areia from '../../assets/image/6.webp';
import escritor from '../../assets/image/9.webp';
import mitologia from '../../assets/image/8.webp';
import monumentos from '../../assets/image/4.webp';
import santos from '../../assets/image/11.webp';
import { Link } from 'react-router-dom';
import styles from './HomeSection.module.css'; 
import Section  from '../../../src/components/Section/Section'

function Colecoes() {
  const colecaoDestaque = [
    {
      imagemSrc: areia,
      altImagem: 'imagem de arte em areia',
      titulo: 'Arte em Areia',
    },
    {
      imagemSrc: mitologia,
      altImagem: 'imagem de iracema',
      titulo: 'Mitologia',
    },
    {
      imagemSrc: escritor, 
      altImagem: 'imagem de escritor', 
      titulo: 'Escritor', 
    },
    {
      imagemSrc: santos,
      altImagem: 'imagem de santo',
      titulo: 'Santos',
    },
    {
      imagemSrc: monumentos,
      altImagem: 'imagem de monumento',
      titulo: 'Monumentos',
    },
  ];

  return (
    <Section title='Destaques' titleAlign='center' link={true}>
    <div className={styles.containerPrincipal}> 
      {colecaoDestaque.map((item, idx) => (
        <div key={idx} className={styles.itemColecao}> 
          <div className={styles.circuloImagem}> 
            <img
              src={item.imagemSrc}
              alt={item.altImagem}
              className={styles.imagemProduto}/> 
            
          </div>
          <Link>
            <div className={styles.tituloProduto}> 
              <h3>{item.titulo}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
    </Section>
  );
}

export default Colecoes;