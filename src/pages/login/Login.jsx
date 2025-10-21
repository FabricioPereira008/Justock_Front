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
