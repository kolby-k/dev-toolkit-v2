import { useState, useRef, useEffect } from "react";

function ColorPickerSelector() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = 300);
    const height = (canvas.height = 200);

    // Create gradient horizontally (Hue)
    const hueGradient = ctx.createLinearGradient(0, 0, width, 0);
    for (let i = 0; i <= 360; i += 60) {
      hueGradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
    }
    ctx.fillStyle = hueGradient;
    ctx.fillRect(0, 0, width, height);

    // Create gradient vertically (Lightness)
    const lightGradient = ctx.createLinearGradient(0, 0, 0, height);
    lightGradient.addColorStop(0, "rgba(255,255,255,0)");
    lightGradient.addColorStop(1, "rgba(0,0,0,0.7)");
    ctx.fillStyle = lightGradient;
    ctx.fillRect(0, 0, width, height);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    setSelectedColor(color);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Canvas Color Picker</h3>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ border: "1px solid #333", cursor: "crosshair" }}
      />
      <p>
        Selected Color:{" "}
        <span
          style={{
            display: "inline-block",
            width: "50px",
            height: "20px",
            backgroundColor: selectedColor,
            border: "1px solid #ccc",
          }}
        />
      </p>
    </div>
  );
}

export default ColorPickerSelector;
