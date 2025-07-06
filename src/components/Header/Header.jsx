import { Link } from 'react-router-dom';

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
      <p>[O Header da Melissa vai aqui]</p>
      <nav>
        <Link to="/carrinho" style={linkStyle}>
          Ir para o Carrinho (Link de Teste)
        </Link>
      </nav>
    </header>
  );
}