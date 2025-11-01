import { useRef, useState } from "react";
import "../../styles/JsonFormatter.css";
import CustomButton from "../../components/CustomButton";
import AlertDialog from "../../components/AlertDialog";

const MIN_ROWS = 30;
const BUFFER = 3;

function JsonFormatter() {
  const [visible, setVisible] = useState<boolean>(false);

  const [json, setJson] = useState<null | string>(null);
  const [rowCount, setRowCount] = useState<number>(MIN_ROWS);

  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);

  const useSampleRef = useRef(true);

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
    setRowCount(MIN_ROWS);
    setJson(sample);
  };
  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    useSampleRef.current = false;
    console.log(e.target);
    const numberOfRows = countLinesStreaming(e.target.value);
    setRowCount(
      numberOfRows >= MIN_ROWS - BUFFER ? numberOfRows + BUFFER : MIN_ROWS
    );
    setJson(e.target.value);
    console.log(rowCount);
  };

  return (
    <div id="tool-full-page">
      <div className="gradient-card header-container">
        <h3 id="tool-page-title">JSON Formatter</h3>
        <div className="button-container">
          <span>
            <CustomButton title="Format" onClick={formatJson} />
            <CustomButton title="Validate" onClick={validateJson} />
            <CustomButton title="Copy" onClick={copyJson} />
          </span>
          <span>
            <CustomButton
              title="Sample JSON"
              onClick={verifySampleInput}
              variant="secondary"
              fontSize={1}
            />
          </span>
        </div>
        <AlertDialog
          title="Insert Sample JSON"
          description="Do you want to replace the current input with sample JSON data?"
          onUserAction={setSampleJson}
          onUserActionLabel="Confirm"
          visible={visible}
          onClose={() => setVisible(false)}
        />
        {(error || success) && (
          <div className="banner">
            {success && <p className="success-text">{success}</p>}
            {error && <p className="error-text">{error}</p>}
          </div>
        )}
      </div>

      <div className="multiline-input-container">
        <div className="multiline-scroll-area">
          <div id="multiline-input-gutter">
            {Array.from({ length: rowCount }).map((_, idx) => (
              <span key={`gutter-${idx + 1}`} id="gutter-label">
                {idx + 1}
              </span>
            ))}
          </div>
          <textarea
            id="json-formatter-input"
            name="json"
            rows={rowCount}
            value={json ? json : ""}
            onChange={handleTextInputChange}
            placeholder={useSampleRef.current ? sample : ""}
          />
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

function countLinesStreaming(s: string): number {
  if (s.length === 0) return 0;
  let lines = 1;
  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i);
    if (ch === 10) lines++; // \n
    else if (ch === 13) {
      // \r\n or lone \r
      lines++;
      if (s.charCodeAt(i + 1) === 10) i++; // skip \n in \r\n
    }
  }
  return lines;
}

function formatJSONError(e: unknown) {
  const msg =
    e instanceof Error
      ? e.message.replace("JSON.parse:", "Error: ")
      : "Unknown Error";
  return msg;
}
