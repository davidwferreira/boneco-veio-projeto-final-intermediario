import PerfilPage from './pages/PerfilPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrateleiraPage from './pages/PrateleiraPage.jsx';
import CarrinhoPage from './pages/CarrinhoPage.jsx';
import ProdutoDetalhePage from './components/ProdutoDetalhePage/ProdutoDetalhePage.jsx';
import './App.css';
import EditarProduto from './components/EditarProduto/EditarProduto.jsx';
import CadastrarProduto from './components/CadastrarProduto/CadastrarProduto.jsx'
import Login from './components/Login/Login.jsx';
import Emconstrucao from './components/EmConstrucao/Emconstrucao.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<PrateleiraPage />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhePage />} />
          <Route path="/produto/editar/:id" element={<EditarProduto />} />
          <Route path="/produto/novo" element={<CadastrarProduto />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
          <Route path="/pedidos" element={<Emconstrucao />} />
          <Route path="/rastreio" element={<Emconstrucao />} />
          <Route path="/contato" element={<Emconstrucao />} />
          <Route path="/endereco" element={<Emconstrucao />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;