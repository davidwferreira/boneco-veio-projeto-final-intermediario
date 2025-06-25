// src/components/ErrorBoundary.jsx
import React, { Component } from "react";

/**
 * Componente de tratamento de erros em tempo de execução (erro de renderização).
 * Evita que a aplicação quebre por completo e exibe uma mensagem de fallback amigável.
 */
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
  };

  /**
   * Atualiza o estado ao capturar um erro em algum filho.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Loga detalhes do erro (pode ser enviado a um serviço de monitoramento).
   */
  componentDidCatch(error, errorInfo) {
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "1rem", background: "#fdd", borderRadius: "6px" }}>
          <h2>Ocorreu um erro ao carregar esta seção.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Recarregar página
          </button>
        </div>
      );
    }

    // Se não houver erro, renderiza normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
