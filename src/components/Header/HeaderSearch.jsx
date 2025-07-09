import React from 'react'
import styles from './Header.module.css';
import logo from '../../assets/logo.png'

const HeaderSearch = () => {
  return (
    <>
        <section className={styles.header_sec}>
            <div className={styles.header_sec}>
                <div className={styles.header_logo}>
                    <img src={logo} alt="Logo Boneco Veio" />
                </div>

                <div className={styles.header_searchbar}>
                    <select name="" id="">
                        <option value="tudo">Todos o Site</option>
                        <option value="históricos">Personagens Históricos</option>
                        <option value="popular">Cultura Popular</option>
                        <option value="paisagens">Paisagens</option>
                    </select>

                    <input type="search" name="searchbar" id="searchbar" />
                    <span>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </span>
                </div>

                <div className={styles.header_account}>
                    <img src="" alt="" />

                    <div>
                        <span>Olá, bem vindo(a)!</span>
                        <p>Entre ou cadastre-se</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default HeaderSearch