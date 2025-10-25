import "../styles/Home.css";
import { MdCircle } from "react-icons/md";
import CustomButton from "../components/CustomButton";

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
        <CustomButton
          title="Get Started"
          to="/tools"
          variant="primary"
          style={{ marginTop: "1rem" }}
        />
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
              <div className="example-card">
                <h5>After</h5>
                <pre>{formattedJSON}</pre>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div id="action-section">
        <h4>Tools by Category:</h4>
        <span id="action-card-container">
          <div className="action-section-card">
            <h5>Frontend Tools</h5>
            <ul className="tool-feature-list">
              <li>Color Picker</li>
              <li>Logo Generator</li>
              <li>Color Contrast Validator</li>
              <li>Code Formatter</li>
            </ul>
            <CustomButton
              title="Use Frontend Tools"
              to="/tools?category=frontend"
              variant="primary"
            />
          </div>
          <div className="action-section-card">
            <h5>Backend Tools</h5>
            <ul className="tool-feature-list">
              <li>JWT Decode/Encode</li>
              <li>API Key Generator</li>
              <li>JSON Mock Data</li>
              <li>Epoch Timestamp Converter</li>
            </ul>
            <CustomButton
              title="Use Backend Tools"
              to="/tools?category=backend"
              variant="secondary"
            />
          </div>
        </span>
      </div>
    </div>
  );
}

export default Home;
