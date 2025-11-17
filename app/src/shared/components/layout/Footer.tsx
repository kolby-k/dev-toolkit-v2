import { NavLink } from "react-router";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-links">
        <NavLink to="/" className="link-text">
          Home
        </NavLink>
        <NavLink to="/tools?category=frontend" className="link-text">
          Frontend
        </NavLink>
        <NavLink to="/tools?category=backend" className="link-text">
          Backend
        </NavLink>
        <NavLink to="/about" className="link-text">
          About
        </NavLink>
      </div>
      <div id="dev-note">
        Note: This is a demo project created by{" "}
        <a href="https://kolbyk.ca" id="developer" target="_blank">
          Kolby Klassen
        </a>
        .
      </div>
    </div>
  );
}

export default Footer;
