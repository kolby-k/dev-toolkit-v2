import { Link } from "react-router";

import NotFoundImage from "../assets/not-found.png";

function NotFound() {
  return (
    <div className="flex-col-container" style={{ minHeight: "90dvh" }}>
      <h1 className="error-text">Error 404</h1>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          width: "300px",
        }}
      >
        <img src={NotFoundImage} id="not-found" />
        <h3>Page Not Found</h3>
      </span>
      <Link to={"/"} id="go-home-link">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
