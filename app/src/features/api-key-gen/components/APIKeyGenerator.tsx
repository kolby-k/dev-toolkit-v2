import { useEffect, useState } from "react";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocument,
} from "react-icons/hi2";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import CustomButton from "../../../shared/components/ui/CustomButton";
import { getCurrentStrengthLabel, generateApiKey } from "../lib/generateApiKey";

import "../styles/APIKeyGenerator.css";

const MAX_KEY_LENGTH = 50;
const MIN_KEY_LENGTH = 10;
const INITAL_KEY_LENGTH = 32;

function APIKeyGenerator() {
  const [currentKey, setCurrentKey] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [strengthLabel, setStrengthLabel] = useState<string>(
    getCurrentStrengthLabel(INITAL_KEY_LENGTH)
  );

  const [keyLength, setKeyLength] = useState<number>(INITAL_KEY_LENGTH);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerateKey = () => {
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
      setErrorMessage("Length must be more than 9 characters.");
      return false;
    } else if (keyLength > MAX_KEY_LENGTH) {
      setErrorMessage("Length must be less than 51 characters.");
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

  useEffect(() => {
    setStrengthLabel(getCurrentStrengthLabel(keyLength));
  }, [keyLength]);

  return (
    <div id="api-key-generator-section">
      <label>Length</label>
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
      <div className="api-key-strength-container">
        <p
          className={`api-key-strength ${strengthLabel
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {strengthLabel}
        </p>
      </div>
      <span id="api-key-result" className={currentKey ? "active" : "inactive"}>
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
        onClick={handleGenerateKey}
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
  );
}

export default APIKeyGenerator;
