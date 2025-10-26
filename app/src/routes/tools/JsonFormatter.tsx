import { useRef, useState } from "react";
import "../../styles/JsonFormatter.css";

const MIN_ROWS = 100;

function JsonFormatter() {
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
      const msg =
        e instanceof Error
          ? e.message.replace("JSON.parse:", "[ERROR]: ")
          : "Unknown Error";
      console.error("Error Log:", e);
      setError(msg);
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
      const msg =
        e instanceof Error
          ? e.message.replace("JSON.parse:", "[ERROR]: ")
          : "Unknown Error";
      setError(msg);
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    useSampleRef.current = false;
    const numberOfRows = countLinesStreaming(e.target.value);
    setRowCount(numberOfRows > MIN_ROWS ? numberOfRows : MIN_ROWS);
    setJson(e.target.value);
    console.log(rowCount);
  };

  return (
    <div id="tool-full-page">
      <div className="button-container">
        <button type="button" onClick={formatJson}>
          Format JSON
        </button>
        <button type="button" onClick={validateJson}>
          Validate JSON
        </button>
        <button type="button" onClick={() => setJson(sample)}>
          Sample JSON
        </button>
      </div>
      {(error || success) && (
        <div className="banner">
          {success && <p className="success-text">{success}</p>}
          {error && <p className="error-text">{error}</p>}
        </div>
      )}
      <div className="multiline-input-container">
        <div id="multiline-input-gutter">
          {Array.from({ length: rowCount }).map((_, idx) => (
            <p key={`gutter-${idx + 1}`} id="gutter-label">
              {idx + 1}
            </p>
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
