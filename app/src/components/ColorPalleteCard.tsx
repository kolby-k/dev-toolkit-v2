export interface ColorPalleteCardProps {
  color: string;
  label: string;
}

function ColorPalleteCard({ color, label }: ColorPalleteCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: color,
        padding: "1rem",
        border: "1px solid black",
        borderRadius: "8px",
        width: "250px",
        height: "150px",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <p
        style={{
          fontSize: "1.05rem",
          fontWeight: 600,
        }}
      >
        {color}
      </p>
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: 500,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default ColorPalleteCard;
