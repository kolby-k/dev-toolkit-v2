import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import "../../styles/APIKeyGenerator.css";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocument,
} from "react-icons/hi2";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

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

  return (
    <div id="tool-page-content">
      <div id="tool-title-section">
        <h2>API Key Generator</h2>
      </div>
      <div id="tool-wrapper-small">
        <h6 style={{ fontWeight: 500 }}>API Key:</h6>
        <label>Length:</label>
        <span id="number-input-wrapper">
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
            <IoIosArrowUp size={12} />
          </button>
          <button
            className="decrement"
            onClick={handleDecrement}
            disabled={keyLength <= MIN_KEY_LENGTH}
          >
            <IoIosArrowDown size={12} />
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
        <p id="download-text-link">Download as JSON</p>
      </div>
    </div>
  );
}

export default APIKeyGenerator;

function generateApiKey(length = 48, prefix = "") {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix ? `${prefix}${key}` : key;
}
