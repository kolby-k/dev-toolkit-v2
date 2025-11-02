import "../styles/Home.css";
import { MdCircle } from "react-icons/md";
import CustomLinkButton from "../components/CustomLinkButton";
import { TiArrowRightOutline, TiArrowDownOutline } from "react-icons/ti";
import { LiaSearchSolid } from "react-icons/lia";

function Home() {
  // preserve whitespace exactly by using <pre> tags
  const formattedJSON = `{ 
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "isActive": true
}
`;
  const messyJSON = `
{"user": {"id": 1,"name": "John Doe","email": "john@example.com","age": 30,"isActive": true}`;

  return (
    <div id="home-wrapper">
      <div className="hero">
        <h1>Frontend & Backend Developer Tools</h1>
        <p>Build, debug, and optimize web apps with ease.</p>
        <CustomLinkButton
          title="Browse Tools"
          to="/tools"
          variant="primary"
          style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem" }}
        >
          <LiaSearchSolid size={16} />
        </CustomLinkButton>
      </div>

      <div id="banner">
        <div id="banner-example-container">
          <div id="browser-view-buttons">
            <MdCircle size={12} className="red" />
            <MdCircle size={12} className="orange" />
            <MdCircle size={12} className="green" />
          </div>
          <div id="broswer-example-content">
            <h4>JSON Formatter</h4>
            <span id="example-card-container">
              <div className="example-card">
                <h5>Before</h5>
                <pre>{messyJSON}</pre>
              </div>
              <TiArrowRightOutline size={28} className="icon lg-show" />
              <TiArrowDownOutline size={28} className="icon lg-hide" />
              <div className="example-card">
                <h5>After</h5>
                <pre>{formattedJSON}</pre>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div id="action-section">
        <h4>Find the right tool:</h4>
        <span id="action-card-container">
          <div className="action-section-card">
            <h5>Frontend Tools</h5>
            <ul className="tool-feature-list">
              <li>Color Picker</li>
              <li>Logo Generator</li>
              <li>Color Contrast Validator</li>
              <li>Code Formatter</li>
              <li>And More..</li>
            </ul>
            <CustomLinkButton
              title="Frontend"
              to="/tools?stack=frontend"
              variant="primary"
              fontSize={1}
            />
          </div>
          <div className="action-section-card">
            <h5>Backend Tools</h5>
            <ul className="tool-feature-list">
              <li>JWT Decode/Encode</li>
              <li>API Key Generator</li>
              <li>JSON Mock Data</li>
              <li>Epoch Timestamp Converter</li>
              <li>And More..</li>
            </ul>
            <CustomLinkButton
              title="Backend"
              to="/tools?stack=backend"
              variant="secondary"
              fontSize={1}
            />
          </div>
        </span>
      </div>
    </div>
  );
}

export default Home;
