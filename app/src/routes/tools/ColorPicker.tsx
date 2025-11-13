import { useState } from "react";
import ColorHarmony from "../../components/ColorHarmony";
import ColorPickerSelector from "../../components/ColorPickerSelector";
import styles from "../../styles/ColorPicker.module.css";

export type ColorPickerData = { color: string; label: string };

function ColorPicker() {
  const [data, setData] = useState<ColorPickerData[]>([
    {
      color: "rgb(0,0,0)",
      label: "Primary",
    },
  ]);

  const handleNewPrimary = (newColor: string) => {
    const newData = [{ color: newColor, label: "Primary" }];
    setData(newData);
  };

  return (
    <div className={styles.page}>
      <h4
        style={{
          textAlign: "center",
          padding: "1rem",
        }}
      >
        Color Picker
      </h4>
      <div className={styles.grid}>
        <div className={styles.trow}>
          <div className={styles.trow1}>
            <ColorPickerSelector
              color={
                data.find((c) => c.label === "Primary")?.color || "rgb(0,0,0)"
              }
              setColor={handleNewPrimary}
            />
          </div>
          <div className={styles.trow2}>
            <ColorHarmony colorList={data} setColorList={setData} />
          </div>
        </div>
        <div className={styles.brow}>
          <div className={styles.brow1}>Tints</div>
          <div className={styles.brow1}>Shades</div>
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
