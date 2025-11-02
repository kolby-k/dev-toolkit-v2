import { useEffect, useRef, useState } from "react";
import "../styles/CustomTextArea.css";

export interface CustomTextAreaProps {
  text: string;
  setText: (newText: string) => void;
}

const MIN_ROWS = 350 / 16;
const BUFFER = 3;

function CustomTextArea({ text = "", setText }: CustomTextAreaProps) {
  const [numRows, setNumRows] = useState<number>(MIN_ROWS);
  const [lineHeight, setLineHeight] = useState<number>(16);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const lh = parseFloat(getComputedStyle(textareaRef.current).lineHeight);
      setLineHeight(lh * 1.5);
    }
  }, []);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value || "";
    setText(val);
    const numRowsWithBuffer = BUFFER + (val?.match(/\n|\r|\r\n/g) || []).length;
    setNumRows(
      numRowsWithBuffer >= MIN_ROWS ? numRowsWithBuffer + 1 : MIN_ROWS
    );
  };

  return (
    <div id="text-area-custom">
      <div id="tac-gutter">
        {Array.from({ length: numRows }).map((_, idx) => {
          return (
            <label
              key={`gutter-idx-${idx}`}
              style={{ height: `${lineHeight}px` }}
            >
              {idx.toString()}
            </label>
          );
        })}
      </div>
      <textarea
        id="tac"
        ref={textareaRef}
        value={text}
        onChange={handleTextInputChange}
        rows={numRows}
        style={{ lineHeight: `${lineHeight}px` }}
      />
    </div>
  );
}

export default CustomTextArea;
