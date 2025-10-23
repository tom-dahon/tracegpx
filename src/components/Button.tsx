// components/Button.tsx
import React, { CSSProperties } from "react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

export default function Button({
   children,
  onClick,
  color = "#0070f3",
  textColor = "white",
  disabled = false,
  style = {},
  className = "",
}: ButtonProps) {
  const baseStyle = {
    backgroundColor: color,
    color: textColor,
    padding: "12px 12px",
    borderRadius: "8px", // radius par défaut
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: "medium",
    fontSize: "16px",
    transition: "0.2s all",
    ...style,
  };

  // Hover effect simple
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) e.currentTarget.style.opacity = '0.85';
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) e.currentTarget.style.opacity = '1';
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
