import { useState } from "react";
import ColorHarmony from "../../components/ColorHarmony";
import ColorPickerSelector from "../../components/ColorPickerSelector";
import styles from "../../styles/ColorPicker.module.css";

export type ColorPickerData = {
  primary: string;
  secondary: string;
};

function ColorPicker() {
  const [data, setData] = useState<ColorPickerData>({
    primary: "rgb(0,0,0)",
    secondary: "rgb(255,255,255)",
  });

  const handleNewPrimary = (newColor: string) => {
    setData((prev) => ({ ...prev, primary: newColor }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.trow}>
          <div className={styles.trow1}>
            Color Picker
            <ColorPickerSelector
              color={data.primary}
              setColor={handleNewPrimary}
            />
          </div>
          <div className={styles.trow2}>
            <ColorHarmony
              primaryColor={data.primary}
              secondaryColor={data.secondary}
            />
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
