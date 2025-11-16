import { useCallback, useEffect, useRef, useState } from "react";
import "../styles/CustomTextArea.css";

export interface CustomTextAreaProps {
  text: string;
  setText: (newText: string) => void;
}

const MIN_ROWS = 30;
const BUFFER = 3;
const LINE_HEIGHT_SCALE = 1.5;

function CustomTextArea({ text = "", setText }: CustomTextAreaProps) {
  const [numRows, setNumRows] = useState<number>(MIN_ROWS);
  const [lineHeight, setLineHeight] = useState<number>(16);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Get the real line-height in px from CSS
  useEffect(() => {
    if (textareaRef.current) {
      const styles = getComputedStyle(textareaRef.current);
      const baseLh = parseFloat(styles.lineHeight);
      if (!Number.isNaN(baseLh)) {
        const scaled = baseLh * LINE_HEIGHT_SCALE;
        setLineHeight(scaled);
      }
    }
  }, []);

  const updateLayoutFromDom = useCallback(() => {
    if (!textareaRef.current || !lineHeight) return;

    const el = textareaRef.current;

    // Auto-grow textarea so it never scrolls internally
    el.style.height = "auto";
    const contentHeight = el.scrollHeight;
    el.style.height = `${contentHeight}px`;

    // Estimate how many visible rows we have
    const visualRows = Math.ceil(contentHeight / lineHeight);

    // Apply a floor & a small buffer if you like
    setNumRows(Math.max(MIN_ROWS, visualRows + BUFFER));
  }, [lineHeight]);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value || "";
    setText(val);

    // After state update, adjust layout
    // (for paste, this still works because we use the DOM directly)
    requestAnimationFrame(updateLayoutFromDom);
  };

  // Also run once on mount / when `text` changes externally
  useEffect(() => {
    updateLayoutFromDom();
  }, [text, updateLayoutFromDom]);
  return (
    <div id="text-area-custom">
      <div id="tac-gutter">
        {Array.from({ length: numRows }).map((_, idx) => (
          <label
            key={`gutter-idx-${idx}`}
            style={{ height: `${lineHeight}px` }}
          >
            {idx + 1}
          </label>
        ))}
      </div>
      <textarea
        id="tac"
        ref={textareaRef}
        value={text}
        onChange={handleTextInputChange}
        rows={MIN_ROWS}
        style={{ lineHeight: `${lineHeight}px` }}
      />
    </div>
  );
}

export default CustomTextArea;
