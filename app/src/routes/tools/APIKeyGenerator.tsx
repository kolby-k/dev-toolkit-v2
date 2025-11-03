import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import "../../styles/APIKeyGenerator.css";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocument,
} from "react-icons/hi2";

function APIKeyGenerator() {
  const [currentKey, setCurrentKey] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const generateKey = () => {
    setCopied(false);
    setCurrentKey(generateApiKey());
  };

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(currentKey);
  };

  return (
    <div id="tool-page-content">
      <div id="tool-title-section">
        <h2>API Key Generator</h2>
      </div>
      <div id="tool-wrapper-small">
        <h6 style={{ fontWeight: 500 }}>API Key:</h6>
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
