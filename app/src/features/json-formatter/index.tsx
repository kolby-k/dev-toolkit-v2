import JsonFormatter from "./components/JsonFormatter";

function index() {
  return (
    <div id="tool-full-page">
      <div className="header-container">
        <h3 id="tool-page-title">JSON Formatter</h3>
        <p>
          Paste your JSON below to easily format, validate, and copy it — or try
          with
          <span className="fancy-label"> sample</span> JSON instead.
        </p>
        <JsonFormatter />
      </div>
    </div>
  );
}

export default index;
