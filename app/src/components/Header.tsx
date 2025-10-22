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
          <h1 id="app-name">Developer Toolkit</h1>
        </Link>
      </div>
      <div className="header-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/tools?category=frontend">Frontend</NavLink>
        <NavLink to="/tools?category=backend">Backend</NavLink>
      </div>

      <CiMenuFries id="header-open-icon" onClick={toggleMiniMenu} />

      {isMenuVisible && (
        <div className="blur fit-screen">
          <div className="header-menu-mobile">
            <NavLink to="/" onClick={() => setIsMenuVisible(false)}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={() => setIsMenuVisible(false)}>
              About
            </NavLink>
            <NavLink
              to="/tools?category=frontend"
              onClick={() => setIsMenuVisible(false)}
            >
              Frontend
            </NavLink>
            <NavLink
              to="/tools?category=backend"
              onClick={() => setIsMenuVisible(false)}
            >
              Backend
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
