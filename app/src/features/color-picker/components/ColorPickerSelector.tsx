import { useRef, useEffect, useState } from "react";
import { oklchToRgb } from "../lib/colorConversions";
import { COLOR_SPACE_OPTIONS, type ColorSpaceType } from "../config/constants";
import { formatColorSpace } from "../lib/formatter";

export interface ColorPickerSelectorProps {
  setColor: (color: string) => void;
  width?: number;
  height?: number;
  // OKLCH controls (optional)
  oklchC?: number; // 0..~0.37 typical gamut; default 0.1
  showSample?: boolean;
}

function ColorPickerSelector({
  setColor,
  width = 300,
  height = 300,
  oklchC = 0.1,
}: ColorPickerSelectorProps) {
  const [colorSpace, setColorSpace] = useState<ColorSpaceType>("rgb");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // draw per color space
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    if (colorSpace === "hsl") {
      // Horizontal: hue 0..360, Vertical: lightness 100..0, S fixed 100%
      const hueGrad = ctx.createLinearGradient(0, 0, width, 0);
      for (let i = 0; i <= 360; i += 30) {
        hueGrad.addColorStop(i / 360, `hsl(${i} 100% 50%)`);
      }
      ctx.fillStyle = hueGrad;
      ctx.fillRect(0, 0, width, height);

      const lightGrad = ctx.createLinearGradient(0, 0, 0, height);
      lightGrad.addColorStop(0, "rgba(255,255,255,0)");
      lightGrad.addColorStop(1, "rgba(0,0,0,0.8)");
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);
      return;
    }

    if (colorSpace === "rgb") {
      // Simple RGB plane: Horizontal R 0..255, Vertical G 255..0, fixed B=128
      const img = ctx.createImageData(width, height);
      const data = img.data;
      const B = 128;
      for (let y = 0; y < height; y++) {
        const g = Math.round(255 * (1 - y / (height - 1)));
        for (let x = 0; x < width; x++) {
          const r = Math.round(255 * (x / (width - 1)));
          const i = (y * width + x) * 4;
          data[i + 0] = r;
          data[i + 1] = g;
          data[i + 2] = B;
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      return;
    }

    if (colorSpace === "oklch") {
      // Horizontal: hue 0..360, Vertical: lightness 1..0, fixed chroma = oklchC
      const img = ctx.createImageData(width, height);
      const data = img.data;
      for (let y = 0; y < height; y++) {
        const L = 1 - y / (height - 1); // 1..0
        for (let x = 0; x < width; x++) {
          const h = 360 * (x / (width - 1));
          const [r, g, b] = oklchToRgb(L, oklchC, h);
          const i = (y * width + x) * 4;
          data[i + 0] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      return;
    }
  }, [colorSpace, width, height, oklchC]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;

    if (a === 0) return;
    setColor(formatColorSpace(colorSpace, r, g, b));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        paddingBottom: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          fontSize: "1.25rem",
          fontWeight: 500,
          margin: "1rem",
        }}
      >
        Color Space
        <select
          id="color-space-choice"
          style={{
            width: 200,
            backgroundColor: "var(--bg-muted)",
            color: "var(--text)",
            padding: "6px",
            border: "1px solid var(--border)",
            borderRadius: 4,
            fontSize: "1.05rem",
            margin: 4,
          }}
          value={colorSpace ?? ""}
          onChange={(e) => setColorSpace(e.target.value as ColorSpaceType)}
        >
          {COLOR_SPACE_OPTIONS.map((c) => (
            <option key={`option-${c}`} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{
          border: "1px solid #333",
          cursor: "crosshair",
          borderRadius: 8,
        }}
      />
    </div>
  );
}

export default ColorPickerSelector;
