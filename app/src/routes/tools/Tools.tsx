import { useState } from "react";
import { Link } from "react-router";
import { TOOLS } from "../../constants";

import "../../styles/Tools.css";

function Tools() {
  const [searchHidden, setSearchHidden] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<null | string>(null);

  return (
    <div className="page-wrapper">
      <div className="tool-section">
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
        <h2>Tool List</h2>
        <div className="tool-list">
          {TOOLS &&
            TOOLS.map((t) => {
              return (
                <Link key={`${t.label}`} to={t.href} className="card">
                  <h6>{t.label} </h6>
                  <p>{t.description}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Tools;
