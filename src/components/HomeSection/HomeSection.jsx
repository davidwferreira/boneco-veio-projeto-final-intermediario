import React from 'react';
import styles from './HomeSection.module.css';
import backgroundImage from '../../assets/image/11.webp'; 

const HomeSection = () => {
  return (
    <section 
      className={styles.homeSection} 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>Bem-vindo ao Nosso Mundo!</h1>
        <p className={styles.description}>
          Descubra os produtos mais incríveis e ofertas exclusivas que preparamos para você.
        </p>
        <a href="/cadastro" className={styles.registerLink}>Cadastre-se Agora</a>
      </div>
    </section>
  );
};

export default HomeSection;