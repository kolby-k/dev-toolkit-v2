import { NavLink, Link } from "react-router";
import { AiFillCode } from "react-icons/ai";
import { IoCloseCircle } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { useState } from "react";

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const toggleMiniMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <AiFillCode id="app-logo" />
          <h1 id="app-name" className="link-text">
            Developer Toolkit
          </h1>
        </Link>
      </div>
      <div className="header-links">
        <NavLink to="/" className="link-text">
          Home
        </NavLink>
        <NavLink to="/tools?stack=frontend" className="link-text">
          Frontend
        </NavLink>
        <NavLink to="/tools?stack=backend" className="link-text">
          Backend
        </NavLink>
        <NavLink to="/about" className="link-text">
          About
        </NavLink>
      </div>

      <CiMenuFries id="header-open-icon" onClick={toggleMiniMenu} />

      {isMenuVisible && (
        <div className="blur fit-screen">
          <div className="header-menu-mobile">
            <NavLink
              to="/"
              onClick={() => setIsMenuVisible(false)}
              className="link-text"
            >
              Home
            </NavLink>
            <NavLink
              to="/tools?stack=frontend"
              onClick={() => setIsMenuVisible(false)}
              className="link-text"
            >
              Frontend
            </NavLink>
            <NavLink
              to="/tools?stack=backend"
              onClick={() => setIsMenuVisible(false)}
              className="link-text"
            >
              Backend
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsMenuVisible(false)}
              className="link-text"
            >
              About
            </NavLink>
            <span id="mobile-close-button" onClick={toggleMiniMenu}>
              Close
              <IoCloseCircle id="header-close-icon" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
