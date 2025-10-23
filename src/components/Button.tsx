// components/Button.jsx
import React from "react";

export default function Button({
  children,
  onClick,
  color = "#0070f3", // couleur par défaut
  textColor = "white", // texte blanc par défaut
  disabled = false,
  style = {},
}) {
  const baseStyle = {
    backgroundColor: color,
    color: textColor,
    padding: "12px 24px",
    borderRadius: "8px", // radius par défaut
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "0.2s all",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
