import React, { useEffect, useState } from "react";

export type ActionStates = "idle" | "loading" | "error" | "success";

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
  animateClick?: boolean;
  loadingDurationMS?: number;
}

function CustomButton({
  title,
  variant = "primary",
  fontSize = 1,
  style = {},
  onClick,
  children,
  animateClick = false,
  loadingDurationMS = 350,
}: CustomButtonProps) {
  const [buttonState, setButtonState] = useState<ActionStates>("idle");

  // Handler to manage the local state before calling onClick();
  const handleClick = () => {
    if (animateClick) {
      setButtonState("loading");
    }

    if (onClick) {
      onClick();
    }
    return;
  };

  // Set a brief loading animation when invoking onClick, only if 'animateClick' is true
  useEffect(() => {
    const animationDelay = async () => {
      await new Promise((r) => setTimeout(r, loadingDurationMS));
      setButtonState("idle");
      return;
    };

    if (animateClick && buttonState === "loading") {
      animationDelay();
    }
  }, [animateClick, buttonState, loadingDurationMS]);

  return (
    <button
      title={buttonState === "loading" ? "loading.." : title}
      onClick={handleClick}
      className={`button-base ${variant}-btn ${buttonState}-btn-state`}
      style={style}
      disabled={buttonState === "loading"}
      aria-label={buttonState === "loading" ? "loading.." : title}
    >
      <p style={{ fontSize: `${fontSize}rem` }}>
        {buttonState === "loading" ? "loading.." : title}
      </p>
      {children}
    </button>
  );
}

export default CustomButton;
