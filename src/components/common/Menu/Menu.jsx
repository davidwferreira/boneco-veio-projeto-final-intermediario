import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu = () => {
  const url = useLocation().pathname;

  return (
    <section className={styles.menu_sec}>
      <div className={styles.menu_container}>
        <nav className={styles.menu_nav}>
          <Link to="/" className={`${styles.links_menu} ${url === '/' ? styles.current_page : ''}`}>Home</Link>
          <Link to="/produtos" className={`${styles.links_menu} ${url === '/produtos' ? styles.current_page : ''}`}>Produtos</Link>
          <Link to="/perfil" className={`${styles.links_menu} ${url === '/perfil' ? styles.current_page : ''}`}>Meu Perfil</Link>
          <Link to="/pedidos" className={`${styles.links_menu} ${url === '/pedidos' ? styles.current_page : ''}`}>Meus Pedidos</Link>
          <Link to="/rastreio" className={`${styles.links_menu} ${url === '/rastreio' ? styles.current_page : ''}`}>Rastrear Pedidos</Link>
          <Link to="/contato" className={`${styles.links_menu} ${url === '/contato' ? styles.current_page : ''}`}>Contato</Link>
          <Link to="/endereco" className={`${styles.links_menu} ${url === '/endereco' ? styles.current_page : ''}`}>Endereço</Link>
        </nav>
      </div>
    </section>
  );
};

export default Menu;
