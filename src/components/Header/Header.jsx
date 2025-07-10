import { Link } from 'react-router-dom';
import HeaderSearch from './HeaderSearch'

export default function Header() {
  // Estilos temporários para visualização
  const headerStyle = {
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none'
  };

  return (
    <header style={headerStyle}>
      <HeaderSearch/>
      <nav>
          <Link to="/perfil" style={linkStyle}>
             Meu Perfil
          </Link>
          <br></br>
        <Link to="/carrinho" style={linkStyle}>
          Ir para o Carrinho (Link de Teste)
        </Link>
      </nav>
    </header>
  );
}