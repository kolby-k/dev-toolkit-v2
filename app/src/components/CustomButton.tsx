import type React from "react";

export type ButtonVariantTypes =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "info";
export interface CustomButtonProps {
  title: string;
  variant?: ButtonVariantTypes;
  fontSize?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
}

function CustomButton({
  title,
  variant = "primary",
  fontSize = 1.15,
  style = {},
  onClick,
  children,
}: CustomButtonProps) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`button-base ${variant}-btn`}
      style={style}
    >
      <p style={{ fontSize: `${fontSize}rem` }}>{title}</p>
      {children}
    </button>
  );
}

export default CustomButton;
