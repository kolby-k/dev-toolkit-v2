import { useState } from "react";
import appLogo from "../assets/logo.png";
import { NavLink, Link } from "react-router";

function Header() {
  const [searchHidden, setSearchHidden] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<null | string>(null);

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/" id="app-logo">
          <img src={appLogo} alt="Developer Toolkit Logo" />
        </Link>
      </div>
      <div className="header-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
      </div>
      <div className="search-container">
        {!searchHidden && (
          <input
            type="text"
            value={searchString ?? ""}
            onChange={(e) => setSearchString(e.target.value)}
          />
        )}
        <div onClick={() => setSearchHidden(!searchHidden)}>Search</div>
      </div>
    </div>
  );
}

export default Header;
