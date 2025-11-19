import React, { useLayoutEffect, useRef, useState } from "react";

const MIN_ROWS = 20;

function CustomTextArea() {
  const [text, setText] = useState<string>("");
  const [gutter, setGutter] = useState<number[] | null>(null);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target?.value;
    // validation or formatting could be done here
    setText(newValue);
  };

  // When text changes, recalculate number of rows for gutter UI
  useLayoutEffect(() => {
    const el = textAreaRef.current;
    if (!el) return;

    const styles = getComputedStyle(el);
    const lineHeight = parseFloat(styles.lineHeight);
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat(styles.paddingBottom);

    // Reset height to let scrollHeight reflect full content
    el.style.height = "auto";

    const innerHeight = el.scrollHeight - paddingTop - paddingBottom;
    const numberOfLines = Math.max(
      MIN_ROWS,
      Math.ceil(innerHeight / lineHeight)
    );

    const newGutter = Array.from({ length: numberOfLines }, (_, i) => i + 1);
    setGutter(newGutter);

    // Grow textarea with content; wrapper caps it & scrolls
    el.style.height = `${
      numberOfLines * lineHeight + paddingTop + paddingBottom
    }px`;
  }, [text]);

  return (
    <div id="custom-text-area-wrapper">
      <div id="custom-text-area-gutter">
        {gutter &&
          gutter.map((i) => (
            <span key={`g-row-${i}`} className="gutter-row-item">
              {i}
            </span>
          ))}
      </div>
      <textarea
        ref={textAreaRef}
        id="custom-text-area"
        value={text}
        onChange={handleTextChange}
      />
    </div>
  );
}

export default CustomTextArea;
