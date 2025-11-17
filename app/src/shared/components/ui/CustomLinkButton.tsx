import type React from "react";
import { Link } from "react-router";
import resetScrollOnRedirect from "../../lib/resetWindowScroll";

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
  // force window to scroll to top when redirecting to new page (50ms delay for smoother transition)
  const onRedirect = async () => {
    if (!scrollOnRedirect) return;
    await resetScrollOnRedirect(50);
  };

  return (
    <Link
      to={to}
      onClick={onRedirect}
      className={`button-base ${variant}-btn`}
      style={style}
    >
      <p style={{ fontSize: `${fontSize}rem` }}> {title} </p>
      {children}
    </Link>
  );
}

export default CustomLinkButton;
