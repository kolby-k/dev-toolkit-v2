export interface TagProps {
  label?: string;
  variant?: "primary" | "secondary";
  fontSize?: number;
}

function Tag({ label = "", variant = "primary", fontSize = 0.8 }: TagProps) {
  return (
    <div
      className={`base-tag ${variant}-tag`}
      style={{ fontSize: `${fontSize}rem` }}
    >
      {label}
    </div>
  );
}

export default Tag;
