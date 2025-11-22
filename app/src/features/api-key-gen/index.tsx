import ExpandableDescription from "../../shared/components/ui/ExpandableDescription";
import ToolHeader from "../../shared/components/ui/ToolHeader";
import APIKeyGenerator from "./components/APIKeyGenerator";

function index() {
  return (
    <div id="tool-page-content" className="extra-bottom-padding">
      <div>
        <ToolHeader
          title="API Key Generator"
          description="Generate a secure API key with a length between 10 and 50 digits"
        />
        <APIKeyGenerator />
        <hr
          style={{
            width: "50%",
            color: "var(--border)",
            margin: "auto",
            marginTop: "1rem",
          }}
        />
        <ExpandableDescription>
          <div className="description-container">
            <h4 style={{ textAlign: "center", width: "100%" }}>
              What is an API Key?
            </h4>
            <p>
              An API key looks like a randomly generated string of characters.
              They are often used by web applications to authenticate and
              authorize clients.
            </p>
            <p>
              A secure API key isn't just “random”, however. It's generated
              using algorithms designed to be mathematically unpredictable —
              rather than relying on predictable things like time, sequences, or
              user input.
            </p>
            <p>
              The key's entropy (its measure of unpredictability) and length
              (how many bits it contains) is what determines its strength. For
              example, a 128-bit key has 2¹²⁸ possible combinations — so large
              that guessing it would take millions of years even with powerful
              computers.
            </p>
            <p>
              By contrast, a weak key might be short, like abcd1234, or
              generated using simple patterns or timestamps, making it much
              easier to predict or brute-force.
            </p>
            <p>
              In practice, treat an API key like a password: do not share it,
              keep it secret, and only generate it with a cryptographically
              secure source.
            </p>
          </div>
        </ExpandableDescription>
      </div>
    </div>
  );
}

export default index;
