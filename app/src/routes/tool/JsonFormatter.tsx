import { useState } from "react";
import "../../styles/JsonFormatter.css";

const MIN_ROWS = 100;

function JsonFormatter() {
  const [json, setJson] = useState<null | string>(null);
  const [rowCount, setRowCount] = useState<number>(MIN_ROWS);

  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);

  const [canReplace, setCanReplace] = useState<boolean>(false);

  const formatJson = () => {
    if (!json) return;
    setError(null);
    setSuccess(null);
    setCanReplace(false);
    try {
      const isValid = JSON.parse(json);
      const t = JSON.stringify(isValid, null, 3);
      setJson(t);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("Error Log:", e);
      setError(msg);
    }
  };

  const validateJson = () => {
    if (!json) return;
    setError(null);
    setSuccess(null);
    setCanReplace(false);
    try {
      JSON.parse(json);
      setSuccess("JSON is Valid!");
    } catch (e) {
      console.error("Error Log:", e);
      const loc = locateJsonError(json, e);

      if (loc) {
        const errorIndex = loc.index;

        const jsonWithError = json.substring(0, errorIndex - 3);
        const remainingJson = json.substring(errorIndex - 3);

        console.log("errir portions: ", jsonWithError);
        console.log("remaining", remainingJson);
        setJson(jsonWithError.concat("[Error Here]").concat(remainingJson));

        setCanReplace(true);
      }

      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    }
  };

  const fixAndFormatJson = () => {
    if (!json) return;
    setError(null);
    setSuccess(null);
    setCanReplace(false);
    try {
      const jsonToFix = json.replaceAll("[Error Here]", "");
      console.log("Replace: ", jsonToFix);
      const validJson = quickFixJson(jsonToFix);
      setJson(validJson);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("Error Log:", e);
      setError(msg);
    }
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
        {canReplace && <button onClick={fixAndFormatJson}>Fix Error</button>}
      </div>
      {(error || success) && (
        <div className="banner">
          {success && <p className="success-text">{success}</p>}
          {error && <p className="error-text">{error}</p>}
        </div>
      )}
      <div className="multiline-input-container">
        <textarea
          id="json-formatter-input"
          name="json"
          rows={rowCount}
          value={json ? json : ""}
          onChange={(e) => setJson(e.target.value)}
        />
      </div>
    </div>
  );
}

export default JsonFormatter;

function locateJsonError(json: string, err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);

  // Try to read "line X column Y"
  const mLineCol = msg.match(/line\s+(\d+)\s+column\s+(\d+)/i);
  if (mLineCol) {
    const line = Number(mLineCol[1]);
    const column = Number(mLineCol[2]);

    const lines = json.split(/\r?\n/);
    const badLine = lines[line - 1] ?? "";
    const caret = " ".repeat(Math.max(0, column - 1)) + "^";

    // convert to absolute index too (optional)
    const index =
      lines.slice(0, line - 1).reduce((n, s) => n + s.length + 1, 0) +
      (column - 1);

    return { line, column, index, excerpt: badLine, caret };
  }

  // Try to read "at position N"
  const mPos = msg.match(/position\s+(\d+)/i);
  if (mPos) {
    const index = Number(mPos[1]);
    // compute line/col from index
    let line = 1,
      col = 1;
    for (let i = 0; i < index && i < json.length; i++) {
      if (json[i] === "\n") {
        line++;
        col = 1;
      } else {
        col++;
      }
    }
    const start = json.lastIndexOf("\n", index - 1) + 1;
    const end = json.indexOf("\n", index);
    const badLine = json.slice(start, end === -1 ? undefined : end);
    const caret = " ".repeat(Math.max(0, index - start)) + "^";
    return { line, column: col, index, excerpt: badLine, caret };
  }

  return null; // couldn't parse message
}
export function quickFixJson(input: string) {
  let s = input;

  // 1) Normalize newlines (optional but helps position math)
  s = s.replace(/\r\n?/g, "\n");

  // 2) Strip line/block comments conservatively
  // - Line comments: only if they start a line (or after leading whitespace)
  s = s.replace(/^[ \t]*\/\/[^\n]*$/gm, "");
  // - Block comments: as you had (still risky inside strings, but common)
  s = s.replace(/\/\*[\s\S]*?\*\//g, "");

  // 3) Convert single-quoted strings to double-quoted (kept your safe pattern)
  s = s.replace(
    /'([^'\\]*(\\.[^'\\]*)*)'/g,
    (_, body) => `"${body.replace(/"/g, '\\"')}"`
  );

  // 4) Fix trailing-only quotes on keys:  foo":  ->  "foo":
  s = s.replace(/([,{]\s*)([A-Za-z_][$\w-]*)"\s*:/g, '$1"$2":');

  // 5) Fix leading-only quotes on keys:   "foo:  ->  "foo":
  //    Avoid touching already-correct "foo": via negative lookahead.
  s = s.replace(
    /([,{]\s*)"(?![^"]*"\s*:)([^"]+)\s*:/g, // <-- stricter guard
    '$1"$2":'
  );
  // 6) Quote bare keys:                   foo:   ->  "foo":
  s = s.replace(/([,{]\s*)(?!")([A-Za-z_][$\w-]*)(\s*):/g, '$1"$2"$3:');
  // 7) Remove trailing commas
  s = s.replace(/,\s*(?=[}\]])/g, "");

  // 8) Remove raw control chars that sneak into strings (very naive)
  s = s.replace(
    /[\u0000-\u001f](?=(?:[^"\\]|\\.)*"(?:(?:[^"\\]|\\.)*")*[^"]*$)/g,
    ""
  );

  // Insert a colon if a quoted key is followed by a value start with no colon.
  // { "foo" "bar" }  ->  { "foo": "bar" }
  // { "n" 123 }      ->  { "n": 123 }
  s = s.replace(
    /([,{]\s*)"([^"]+)"\s+(?=(?:"|\{|\[|[-0-9]|t|f|n))/g,
    '$1"$2": '
  );
  console.log("s", s);
  // 9) Final attempt: parse + pretty print
  try {
    return JSON.stringify(JSON.parse(s), null, 2);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error("Could not fix JSON: " + msg);
  }
}
