const TOOLS = [
  {
    label: "tool 1",
  },
  {
    label: "tool 2",
  },
  {
    label: "tool 3",
  },
  {
    label: "tool 1",
  },
  {
    label: "tool 1",
  },
  {
    label: "tool 2",
  },
  {
    label: "tool 3",
  },
  {
    label: "tool 1",
  },
  {
    label: "tool 1",
  },
  {
    label: "tool 2",
  },
  {
    label: "tool 3",
  },
  {
    label: "tool 1",
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
                <div key={`${t.label}`} className="card">
                  {t.label}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
