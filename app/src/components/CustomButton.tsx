import type React from "react";
import { Link } from "react-router";

export type ButtonVariantTypes =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "info";
export interface CustomButtonProps {
  title: string;
  onClick?: () => void;
  variant?: ButtonVariantTypes;
  to?: string;
  fontSize?: number;
  style?: React.CSSProperties;
}

function CustomButton({
  title,
  onClick,
  variant = "primary",
  to = "#",
  fontSize = 1.15,
  style = {},
}: CustomButtonProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`button-base ${variant}-btn`}
      style={style}
    >
      <p style={{ fontSize: `${fontSize}rem` }}> {title} </p>
    </Link>
  );
}

export default CustomButton;
