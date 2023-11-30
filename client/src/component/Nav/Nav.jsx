import { Link } from "react-router-dom";
import "../Nav/Nav.css";
import logo from "../../image/ordenador.png";

export const Nav = () => {
  return (
    <nav className="header">
      <div className="headerLogo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <nav className="headerLinks">
        <div className="links">
          <Link to="/home">Home</Link>
        </div>
        <div className="links">
          <Link to="/matriculas">Registro Matricula</Link>
          <Link to="/asistencia">Registrar Asistencia</Link>
          <Link to="/matricula">Registrar Matricula</Link>
          <Link to="/asistencias">Registro de Asistencias</Link>
        </div>
      </nav>
    </nav>
  );
};
