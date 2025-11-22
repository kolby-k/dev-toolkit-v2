import ToolHeader from "../../shared/components/ui/ToolHeader";
import ColorPicker from "./components/ColorPicker";
import type { ColorSpaceType } from "./config/constants";
import styles from "./styles/ColorPicker.module.css";

export type ColorPickerData = { color: string; label: string };

export type ColorSpaceData = {
  colorSpace: ColorSpaceType;
  values: [number, number, number];
  min: number;
  max: number;
};

function index() {
  return (
    <div className={styles.page}>
      <ToolHeader
        title="Color Picker"
        description="Select a primary color, modify the color space, and easily visualize a
        color pallete using different combinations."
      />
      <ColorPicker />
    </div>
  );
}

export default index;
