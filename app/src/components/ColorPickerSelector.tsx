import { useRef, useEffect, useState } from "react";

export type ColorSpaceType = "rgb" | "hsl" | "oklch";
export interface ColorPickerSelectorProps {
  color: string;
  setColor: (color: string) => void;
  width?: number;
  height?: number;
  // OKLCH controls (optional)
  oklchC?: number; // 0..~0.37 typical gamut; default 0.1
}

const COLOR_SPACE_OPTIONS: ColorSpaceType[] = ["rgb", "hsl", "oklch"];
// ---------- Utilities ----------

// sRGB companding
const srgbToLinear = (c: number) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const linearToSrgb = (c: number) => {
  const x = Math.max(0, Math.min(1, c)); // clamp first
  const v = x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
  return Math.round(v * 255);
};

// RGB (0–255) -> HSL (deg, %, %)
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  let h = 0,
    s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const rl = srgbToLinear(r),
    gl = srgbToLinear(g),
    bl = srgbToLinear(b);

  // linear sRGB -> LMS
  const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  const C = Math.hypot(a, b2);
  let h = (Math.atan2(b2, a) * 180) / Math.PI;
  if (h < 0) h += 360;

  return [L, C, h]; // L: 0..1, C: 0..~0.37, h: 0..360
}

function oklchToRgb(L: number, C: number, h: number): [number, number, number] {
  const hr = (h * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);

  // OKLab
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  // LMS -> linear sRGB
  const rl = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gl = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = +0.0041960863 * l - 0.7034186147 * m + 1.6996225549 * s;

  // linear -> sRGB
  return [linearToSrgb(rl), linearToSrgb(gl), linearToSrgb(bl)];
}

// Formatter
function formatColorSpace(
  colorSpace: ColorSpaceType,
  r: number,
  g: number,
  b: number
): string {
  if (colorSpace === "rgb") return `rgb(${r}, ${g}, ${b})`;
  if (colorSpace === "hsl") {
    const [h, s, l] = rgbToHsl(r, g, b);
    return `hsl(${h} ${s}% ${l}%)`;
  }
  // oklch
  const [L, C, h] = rgbToOklch(r, g, b);
  const p = (x: number, d = 4) => Number(x.toFixed(d));
  return `oklch(${p(L)} ${p(C)} ${p(h)})`;
}
// ---------- Component ----------

function ColorPickerSelector({
  color,
  setColor,
  width = 300,
  height = 200,
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
    <div style={{ textAlign: "center", border: "1px solid red" }}>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ border: "1px solid #333", cursor: "crosshair" }}
      />
      <div
        style={{
          border: "1px solid brown",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>
          Selected Color:{" "}
          <span
            style={{
              display: "inline-block",
              minWidth: 80,
              height: 24,
              verticalAlign: "middle",
              background: colorSpace === "oklch" ? color : undefined,
              backgroundColor: colorSpace !== "oklch" ? color : undefined,
              border: "1px solid #ccc",
              marginLeft: 8,
            }}
            title={color}
          />
          {/* <code style={{ marginLeft: 8 }}>{color}</code> */}
        </p>
      </div>
      <div>
        Color Space
        <select
          id="color-space-choice"
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
    </div>
  );
}

export default ColorPickerSelector;
