// components/Button.jsx
import React from "react";

export default function Button({
  children,
  onClick,
  color = "#0070f3", // couleur par défaut
  textColor = "white", // texte blanc par défaut
  disabled = false,
  style = {},
  className = {},
}) {
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
  const handleMouseEnter = (e) => {
    if (!disabled) e.currentTarget.style.opacity = 0.85;
  };
  const handleMouseLeave = (e) => {
    if (!disabled) e.currentTarget.style.opacity = 1;
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
