## TODO

- Setup Routing
  -- Replace header anchor tags with Link tags (DONE)

- Install react icon package
  -- replace search text with an icon to toggle search input

- Use a callback function in Home route
  -- filter tools based on search value prop; pass prop to toolList from Home; update using callback prop in Header

- Define constant TOOLS with real labels,descriptions,href,iconLabel
  -- use undefined href for tools that are not yet complete (DONE)
  -- add a new 'not found' page for 404 handling (DONE)

- Plan tool components
  -- what components can be shared across tools? Otherwise remaining components need to be specialized for a specific tool, so try to plan and make as many re-usable components first.

- Implement tool logic (Page, Components, Style)
  -- Tool 1: JSON formatter
  -- Tool 2: Character counter
  -- Tool 3: Text Compare
  -- Tool 4: URL Encode / Decode
  -- Tool 5: Base64 Encode / Decode
  -- Tool 6: JSON Generator- give key names and data types, then generate random values that align.
  -- Tool 7: JSON Snippets: save JSON snippets to easily copy and paste for later.
  -- Tool 8: JWT Decode / Generator
  -- Tool 9: API Key Generator
  -- Tool 10: Unix Timestamp to Readable time
  -- Tool 11: OKLCH Color Picker
  -- Tool 12: Character Replace- easily replace non UTF-8/Ascii chars from text by selecting a bad value to replace with new good value.

- Add global context for toast messages
  -- use in components for displaying error/success info.

## Text Area Design Inspiration

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Textarea with Line Numbers</title>
    <style>
      :root {
        --bg: #0f1216;
        --panel: #12161b;
        --gutter: #0b0e12;
        --border: #1e2630;
        --text: #e7edf3;
        --muted: #9fb0c0;
        --accent: #3aa675;
        --radius: 12px;
        --lh: 1.5; /* line-height unitless */
        --fs: 14px; /* font-size */
      }

      body {
        margin: 0;
        padding: 2rem;
        background: var(--bg);
        color: var(--text);
        font: 15px/1.4 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell,
          "Noto Sans", "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji";
      }

      .field {
        max-width: 900px;
        margin-inline: auto;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .editor {
        display: grid;
        grid-template-columns: auto 1fr; /* gutter | textarea */
        align-items: stretch;
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        overflow: hidden; /* clip rounded corners */
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
      }

      /* Gutter */
      .gutter {
        background: var(--gutter);
        color: var(--muted);
        padding: 0.5rem 0.75rem;
        text-align: right;
        border-right: 1px solid var(--border);
        user-select: none;
        font: 400 var(--fs) ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          "Liberation Mono", monospace;
        line-height: var(--lh);
        /* Keep line numbers aligned with textarea content */
        overflow: hidden;
      }

      /* Textarea */
      .code {
        background: transparent;
        color: var(--text);
        border: 0;
        resize: vertical; /* allow vertical resizing */
        min-height: 240px;
        padding: 0.5rem 0.75rem;
        outline: none;
        font: 400 var(--fs) ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          "Liberation Mono", monospace;
        line-height: var(--lh);
        tab-size: 2;
        /* Soft wrap like a typical editor; change to wrap="off" in HTML to disable */
        white-space: pre-wrap;
        overflow: auto;
      }

      /* Scroll syncing: hide horizontal bar if wrapping, show vertical */
      .code {
        overflow-y: auto;
        overflow-x: hidden;
      }

      /* Focus ring on the wrapper */
      .editor:has(textarea:focus) {
        outline: 2px solid color-mix(in oklab, var(--accent), white 10%);
        outline-offset: 2px;
      }

      .hint {
        margin-top: 0.5rem;
        color: var(--muted);
        font-size: 0.9rem;
      }

      /* Make the gutter track the textarea height visually when user resizes */
      .editor {
        /* Let both columns grow together */
        align-items: stretch;
      }
    </style>
  </head>
  <body>
    <div class="field">
      <label for="code">Notes / Code</label>

      <div class="editor" id="editor">
        <pre class="gutter" aria-hidden="true" id="gutter">1</pre>
        <textarea
          id="code"
          class="code"
          spellcheck="false"
          placeholder="Type here…&#10;New lines will be numbered."
        >
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("world");</textarea
        >
      </div>

      <p class="hint">
        Tip: Press Tab to insert spaces; gutter stays in sync as you type or
        scroll.
      </p>
    </div>

    <script>
      (function () {
        const ta = document.getElementById("code");
        const gutter = document.getElementById("gutter");

        // Update line numbers based on logical lines (split by \n)
        function updateLineNumbers() {
          // Count at least 1 line even if empty
          const lines = ta.value.split("\n").length || 1;
          // Rebuild gutter content only when needed
          const currentCount =
            gutter.childElementCount || gutter.textContent.split("\n").length;
          if (lines !== currentCount) {
            // Fast build using a single string
            let s = "";
            for (let i = 1; i <= lines; i++) {
              s += i + (i < lines ? "\n" : "");
            }
            // Use textContent to avoid HTML injection
            gutter.textContent = s;
          }
          syncScroll();
        }

        // Keep gutter scrolled with the textarea
        function syncScroll() {
          gutter.scrollTop = ta.scrollTop;
        }

        // Insert spaces on Tab (like editors)
        function enableSoftTab(e) {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            const tab = "  "; // 2 spaces; adjust as needed
            ta.setRangeText(tab, start, end, "end");
            updateLineNumbers();
          }
        }

        // Hook up events
        ta.addEventListener("input", updateLineNumbers);
        ta.addEventListener("scroll", syncScroll);
        ta.addEventListener("keydown", enableSoftTab);

        // If the textarea is resized (user drag), keep gutter height visually aligned
        // The gutter uses the same line-height so we only need to keep scroll synced.
        // Still, on resize, a reflow can change scrollTop/height; we refresh once.
        const ro = new ResizeObserver(() => syncScroll());
        ro.observe(ta);

        // Initial paint
        updateLineNumbers();

        // Optional: if you prefer *no wrapping* (one number per true row),
        // set wrap="off" on the textarea in HTML OR uncomment:
        // ta.setAttribute('wrap', 'off');
      })();
    </script>
  </body>
</html>
```
