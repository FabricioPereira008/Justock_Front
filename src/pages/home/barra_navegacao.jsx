import "../../styles/pages/home/barra_navegacao.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function BarraNavegacao({ onOpenPlanos }) {

  return (
    <nav className="navegacao">
      <div className="container-navegacao">
        <div className="logo-navegacao">
            <Link to="/">
              <img src={logo} alt="Logo JusTock" />
            </Link>
        </div>
        <ul className="links_navegacao">
          <li><a href="#">Home</a></li>
          <li><a href="#">Novidades</a></li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenPlanos && onOpenPlanos(); }}>
              Planos
            </a>
          </li>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Contato</a></li>
          <li><a href="#">Suporte</a></li>
        </ul>
        <Link to="/login">
          <button className="login_navegacao">Login</button>
        </Link>
      </div>
    </nav>
  );
}

export default BarraNavegacao;
