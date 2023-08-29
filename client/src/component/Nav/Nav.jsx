import { Link } from "react-router-dom";
import "../Nav/Nav.css";
import logo from "../../image/dogs_1.jpg";

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
          <Link to="/dog">Create</Link>
        </div>
      </nav>
    </nav>
  );
};
