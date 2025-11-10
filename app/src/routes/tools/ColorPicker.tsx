import ColorPickerSelector from "../../components/ColorPickerSelector";
import styles from "../../styles/ColorPicker.module.css";

function ColorPicker() {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.trow}>
          <div className={styles.trow1}>
            Color Picker
            <ColorPickerSelector />
          </div>
          <div className={styles.trow2}>Color Harmony</div>
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
