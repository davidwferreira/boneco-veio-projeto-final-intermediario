import PerfilPage from './pages/PerfilPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Prateleira from './components/Prateleira/Prateleira.jsx';
import CarrinhoPage from './pages/CarrinhoPage.jsx';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <main className="main-content">
        <Header />
        <Routes>
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/" element={<Prateleira />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;