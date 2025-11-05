import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Optional: report to monitoring service
    // console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = () => {
    // Try a soft reset to the dashboard root if provided, else full reload
    if (this.props.onReset) {
      this.setState({ hasError: false, error: null });
      try { this.props.onReset(); } catch { window.location.reload(); }
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Ocorreu um erro nesta seção</h2>
          <p>Tente novamente. Se persistir, entre em contato com o suporte.</p>
          <button onClick={this.handleReload} style={{ padding: '8px 12px' }}>Recarregar</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
