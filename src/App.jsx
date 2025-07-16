import PerfilPage from './pages/PerfilPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Prateleira from './components/Prateleira/Prateleira.jsx';
import CarrinhoPage from './pages/CarrinhoPage.jsx';
import ProdutoDetalhePage from './components/ProdutoDetalhePage/ProdutoDetalhePage.jsx';
import './App.css';
import EditarProduto from './components/EditarProduto/EditarProduto.jsx';
import CadastrarProduto from './components/CadastrarProduto/CadastrarProduto.jsx'
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Prateleira />} />
          <Route path="/produto/:id" element={<ProdutoDetalhePage />} />
          <Route path="/produto/editar/:id" element={<EditarProduto />} />
          <Route path="/produto/novo" element={<CadastrarProduto />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;