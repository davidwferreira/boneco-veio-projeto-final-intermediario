import React, { createContext, useState, useContext } from 'react';

//  O contexto é objeto que os componentes podem usar para partilhar dados sem passar props.
const CartContext = createContext();

// O provedor que abraça a aplicação e fornecer o estado do carrinho.
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // Estado que guarda os itens do carrinho

  // Função para adicionar um produto ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Verifica se o produto já existe no carrinho
      const itemExists = prevItems.find((item) => item.id === product.id);
      
      if (itemExists) {
        // Se existe, aumenta a quantidade
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona o produto com quantidade 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // O valor (value) que será partilhado com os componentes filhos
  const value = {
    cartItems,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personalizado para usar o useCart() (em vez de importar o useContext e o CartContext em todos os componentes)
export function useCart() {
  return useContext(CartContext);
}