import { useState } from "react";
import AlertDialog from "../../../shared/components/ui/AlertDialog";
import CustomButton from "../../../shared/components/ui/CustomButton";
import CustomTextArea from "../../../shared/components/ui/CustomTextArea";

import "../styles/JsonFormatter.css";

function JsonFormatter() {
  const [json, setJson] = useState<null | string>(null);

  const [visible, setVisible] = useState<boolean>(false);

  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);

  const formatJson = () => {
    if (!json) return;
    setError(null);
    setSuccess(null);
    try {
      const isValid = JSON.parse(json);
      const t = JSON.stringify(isValid, null, 3);
      setJson(t);
    } catch (e) {
      setError(formatJSONError(e));
    }
  };

  const validateJson = () => {
    if (!json) return;
    setError(null);
    setSuccess(null);
    try {
      JSON.parse(json);
      setSuccess("JSON is Valid!");
    } catch (e) {
      setError(formatJSONError(e));
    }
  };

  const copyJson = () => {
    return navigator.clipboard.writeText(json ? json : "");
  };

  const verifySampleInput = () => {
    if (json && json.length > 0 && sample !== json) {
      return setVisible(true);
    } else {
      return setSampleJson();
    }
  };

  const setSampleJson = () => {
    setJson(sample);
  };

  return (
    <div id="tool-full-page">
      <div className="header-container">
        <h3 id="tool-page-title">JSON Formatter</h3>
        <div className="json-formatter-button-container">
          <span>
            <CustomButton title="Format" onClick={formatJson} />
            <CustomButton title="Validate" onClick={validateJson} />
            <CustomButton
              title="Copy"
              onClick={copyJson}
              animateClick
              loadingDurationMS={200}
            />
          </span>
          <span>
            <CustomButton
              title="Sample JSON"
              onClick={verifySampleInput}
              variant="secondary"
              fontSize={1}
            />
            <AlertDialog
              title="Insert Sample JSON"
              description="Do you want to replace the current input with sample JSON data?"
              onUserAction={setSampleJson}
              onUserActionLabel="Confirm"
              visible={visible}
              onClose={() => setVisible(false)}
            />
          </span>
        </div>
        {(error || success) && (
          <div className="banner">
            {success && <p className="success-text">{success}</p>}
            {error && <p className="error-text">{error}</p>}
          </div>
        )}
        <div>
          <CustomTextArea text={json ? json : ""} setText={setJson} />
        </div>
      </div>
    </div>
  );
}

export default JsonFormatter;

const sample = `{
    "_id": "68f5690392eeb16d5065c9a7",
    "index": 0,
    "guid": "de9eec1d-6cc8-4bfb-b83b-c0fd8006eae1",
    "isActive": true,
    "balance": "$1,834.77"
  }`;

function formatJSONError(e: unknown) {
  const msg =
    e instanceof Error
      ? e.message.replace("JSON.parse:", "Error: ")
      : "Unknown Error";
  return msg;
}
