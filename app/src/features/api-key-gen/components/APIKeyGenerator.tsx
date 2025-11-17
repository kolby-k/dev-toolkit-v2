import { useState } from "react";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocument,
} from "react-icons/hi2";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import CustomButton from "../../../shared/components/ui/CustomButton";
import ExpandableDescription from "../../../shared/components/ui/ExpandableDescription";
import "../styles/APIKeyGenerator.css";

const MAX_KEY_LENGTH = 99;
const MIN_KEY_LENGTH = 12;

function APIKeyGenerator() {
  const [currentKey, setCurrentKey] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const [keyLength, setKeyLength] = useState<number>(55);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const generateKey = () => {
    setCopied(false);
    const isValid = validateKeyLengthInput();
    if (!isValid) return setCurrentKey("");
    setCurrentKey(generateApiKey(keyLength));
  };

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(currentKey);
  };

  const handleIncrement = () => {
    const newKeyLength = keyLength + 1;
    if (newKeyLength > MAX_KEY_LENGTH) return;
    return setKeyLength(newKeyLength);
  };

  const handleDecrement = () => {
    const newKeyLength = keyLength - 1;
    if (newKeyLength < MIN_KEY_LENGTH) return;
    return setKeyLength(newKeyLength);
  };

  const validateKeyLengthInput = () => {
    if (keyLength < MIN_KEY_LENGTH) {
      setErrorMessage("Length must be more than 19 characters.");
      return false;
    } else if (keyLength > MAX_KEY_LENGTH) {
      setErrorMessage("Length must be less than 99 characters.");
      return false;
    } else {
      setErrorMessage(null);
      return true;
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify({ apiKey: currentKey }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "api-key.json"; // filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="tool-page-content" className="extra-bottom-padding">
      <div id="tool-title-section">
        <h2>API Key Generator</h2>
      </div>
      <div id="tool-wrapper-small">
        <label style={{ marginBottom: "-10px" }}>Length:</label>
        <span id="number-input-wrapper">
          <button
            className="decrement"
            onClick={handleDecrement}
            disabled={keyLength <= MIN_KEY_LENGTH}
          >
            <IoIosArrowDown />
          </button>
          <input
            type="number"
            min={MIN_KEY_LENGTH}
            max={MAX_KEY_LENGTH}
            value={keyLength}
            onChange={(e) => setKeyLength(parseInt(e.target.value))}
            className="number-input"
          />
          <button
            className="increment"
            onClick={handleIncrement}
            disabled={keyLength >= MAX_KEY_LENGTH}
          >
            <IoIosArrowUp />
          </button>
        </span>
        <span
          id="api-key-result"
          className={currentKey ? "active" : "inactive"}
        >
          <p>{currentKey}</p>
          {currentKey && (
            <>
              {" "}
              {copied ? (
                <HiOutlineClipboardDocumentCheck id="copy-icon-success" />
              ) : (
                <HiOutlineClipboardDocument
                  id="copy-icon"
                  onClick={copyToClipboard}
                />
              )}{" "}
            </>
          )}
        </span>
        <CustomButton
          onClick={generateKey}
          title="Generate API Key"
          variant="primary"
          style={{ marginTop: "1rem" }}
        />
        {errorMessage && <div className="error-text">{errorMessage}</div>}
        {currentKey && (
          <p id="download-text-link" onClick={handleDownload}>
            Download as JSON
          </p>
        )}
      </div>
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
            A secure API key isn't just “random”, however. It's generated using
            algorithms designed to be mathematically unpredictable — rather than
            relying on predictable things like time, sequences, or user input.
          </p>
          <p>
            The key's entropy (its measure of unpredictability) and length (how
            many bits it contains) is what determines its strength. For example,
            a 128-bit key has 2¹²⁸ possible combinations — so large that
            guessing it would take millions of years even with powerful
            computers.
          </p>
          <p>
            By contrast, a weak key might be short, like abcd1234, or generated
            using simple patterns or timestamps, making it much easier to
            predict or brute-force.
          </p>
          <p>
            In practice, treat an API key like a password: do not share it, keep
            it secret, and only generate it with a cryptographically secure
            source.
          </p>
        </div>
      </ExpandableDescription>
    </div>
  );
}

export default APIKeyGenerator;

function generateApiKey(bytes: number = 32, prefix = ""): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf); // secure
  const b64 = base64url(buf);
  return prefix ? `${prefix}.${b64}` : b64;
}

function base64url(bytes: Uint8Array): string {
  // Convert bytes -> binary string -> base64, then make it URL-safe
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
