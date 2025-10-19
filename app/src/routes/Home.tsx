import { Link } from "react-router";

const TOOLS = [
  {
    label: "JSON Formatter",
    description: "Quickly turn your JSON into a clean and readable format.",
    href: "/tool/json-formatter",
  },
  {
    label: "tool 2",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 3",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 1",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 1",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 2",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 3",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 1",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 1",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 2",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 3",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 1",
    description: "Coming Soon!",
    href: "/tool/",
  },
  {
    label: "tool 1",
    description: "Coming Soon!",
    href: "/tool/",
  },
];

function Home() {
  return (
    <div className="page-wrapper">
      <div className="hero">
        <h1>Developer Toolkit</h1>
        <p>All of the tools you need, in one place.</p>
      </div>
      <div className="tool-section">
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

export default Home;
