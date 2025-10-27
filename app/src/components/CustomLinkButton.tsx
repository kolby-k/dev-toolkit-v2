import type React from "react";
import { Link } from "react-router";

export type ButtonVariantTypes =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "info";
export interface CustomLinkButtonProps {
  title: string;
  variant?: ButtonVariantTypes;
  to?: string;
  scrollOnRedirect?: boolean;
  fontSize?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function CustomLinkButton({
  title,
  variant = "primary",
  to = "#",
  scrollOnRedirect = true,
  fontSize = 1.15,
  style = {},
  children,
}: CustomLinkButtonProps) {
  const resetScrollOnRedirect = async () => {
    if (!scrollOnRedirect) return;
    await new Promise((r) => setTimeout(r, 50));
    return window.scrollTo({ top: 0, behavior: "smooth" });
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

export default CustomLinkButton;
