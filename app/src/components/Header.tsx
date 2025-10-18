import { useState } from "react";
import appLogo from "../assets/logo.png";

function Header() {
  const [searchHidden, setSearchHidden] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<null | string>(null);

  return (
    <div className="header">
      <div className="logo-container">
        <a href="/" id="app-logo">
          <img src={appLogo} alt="Developer Toolkit Logo" />
        </a>
      </div>
      <div className="header-links">
        <p>Home</p> <p>FAQ</p>
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
