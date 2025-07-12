// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';

// Pages (importações organizadas por feature)
import PerfilPage from '../features/usuario/pages/PerfilPage';
import Home from '../pages/Home';
import EditarProduto from '../features/produto/pages/EditarProduto';
import CadastrarProduto from '../features/produto/pages/CadastrarProduto';
import ExibirProdutos from '../features/produto/pages/ExibirProdutos';
import CarrinhoPage from '../features/carrinho/pages/CarrinhoPage';
import NotFound from '../features/notfound/NotFoundComponent';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="/produtos" element={<ExibirProdutos />} />
      <Route path="/produto/editar/:id" element={<EditarProduto />} />
      <Route path="/produto/novo" element={<CadastrarProduto />} />
      <Route path="/carrinho" element={<CarrinhoPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
