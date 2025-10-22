import { Link } from "react-router";

function Home() {
  return (
    <div className="page-wrapper">
      <div className="hero">
        <h1>Developer Toolkit</h1>
        <p>All of the tools you need, in one place.</p>
        <Link to={"/tools"} id="get-started-button">
          Get Started
        </Link>
      </div>

      <div id="banner">
        <div>Card</div>

        <div>Banner</div>
      </div>
      <div>
        View Tools by Category:
        <div>Frontend Tools</div>
        <div>Backend Tools</div>
      </div>
    </div>
  );
}

export default Home;
