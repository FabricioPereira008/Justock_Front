import "../../styles/login_styles/login.css";
import logo from "../../assets/logo_preto_baix.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For testing, navigate directly to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src={logo} alt="Logo JusTock" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="login-help">
          <a href="#">Precisa de ajuda para entrar?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
