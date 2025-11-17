export type TagVariantTypes = "primary" | "secondary" | "tertiary" | "misc";

export interface TagProps {
  label?: string;
  variant?: TagVariantTypes;
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
