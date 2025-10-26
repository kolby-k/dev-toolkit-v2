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
  variant?: ButtonVariantTypes;
  to?: string;
  scrollOnRedirect?: boolean;
  fontSize?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function CustomButton({
  title,
  variant = "primary",
  to = "#",
  scrollOnRedirect = true,
  fontSize = 1.15,
  style = {},
  children,
}: CustomButtonProps) {
  const resetScrollOnRedirect = () => {
    if (!scrollOnRedirect) return;
    return window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <Link
      to={to}
      onClick={resetScrollOnRedirect}
      className={`button-base ${variant}-btn`}
      style={style}
    >
      <p style={{ fontSize: `${fontSize}rem` }}> {title} </p>
      {children}
    </Link>
  );
}

export default CustomButton;
