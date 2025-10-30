import "../../styles/pages/login/login.css";
import logo from "../../assets/logo_preto_baix.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="container-login">
      <button
        className="seta-voltar"
        aria-label="Voltar para home"
        onClick={() => navigate('/')}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>
      <div className="cartao-login">
        <div className="logo-login">
          <img src={logo} alt="Logo JusTock" />
        </div>

        <form className="formulario-login" onSubmit={handleSubmit}>
          <div className="grupo-formulario">
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              required
            />
          </div>

          <div className="grupo-formulario">
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              required
            />
          </div>

          <button type="submit" className="botao-login">
            Entrar
          </button>
        </form>

        <div className="ajuda-login">
          <a href="#">Precisa de ajuda para entrar?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
