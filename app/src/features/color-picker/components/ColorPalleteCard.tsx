import styles from "../styles/ColorPicker.module.css";

export interface ColorPalleteCardProps {
  color: string;
  label: string;
  showTextOnHover?: boolean;
}

function ColorPalleteCard({
  color,
  label,
  showTextOnHover = true,
}: ColorPalleteCardProps) {
  const handleCopyColor = () => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div
      style={{
        background: color,
      }}
      className={styles.colorPalleteCard}
      onClick={handleCopyColor}
    >
      <span
        className={`${styles.colorPalleteCardText} ${
          showTextOnHover ? styles.colorPalleteCardTextHidden : ""
        }`}
      >
        <p>{color}</p>
        <p>{label}</p>
      </span>
    </div>
  );
}

export default ColorPalleteCard;
