import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Prateleira from "./components/Prateleira/Prateleira";
import CadastrarProduto from "./components/CadastrarProduto/CadastrarProduto";
import ProdutoDetalhePage from "./components/ProdutoDetalhePage/ProdutoDetalhePage";
import EditarProduto from "./components/EditarProduto/EditarProduto";


export default function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Prateleira />} />
            <Route path="/produto/novo" element={<CadastrarProduto/>} />
            <Route path="/:id" element={<ProdutoDetalhePage/>} />
            <Route path="/produto/editar/:id" element={<EditarProduto />} />
          </Routes>
        </BrowserRouter>
  );
}
