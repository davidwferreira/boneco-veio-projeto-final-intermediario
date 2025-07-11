import PerfilPage from './pages/PerfilPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Prateleira from './components/Prateleira/Prateleira.jsx';
import CarrinhoPage from './pages/CarrinhoPage.jsx';
import './App.css';
import EditarProduto from './components/EditarProduto/EditarProduto.jsx';
import CadastrarProduto from './components/CadastrarProduto/CadastrarProduto.jsx'
import NotFoundComponent from './components/NotFoundComponent/NotFoundComponent.jsx'
import Home from './pages/Home.jsx';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/produto/editar/:id" element={<EditarProduto />} />
          <Route path="/produto/novo" element={<CadastrarProduto />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;