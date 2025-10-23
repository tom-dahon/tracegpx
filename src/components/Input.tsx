// components/Input.jsx
import React from "react";

export default function Input({
  value,
  onChange,
  placeholder = "",
  width = "100%",      // largeur par défaut
  padding = "12px 16px",
  borderRadius = "8px",
  disabled = false,
  style = {},
  type = "text",
}) {
  const baseStyle = {
    width,
    padding,
    borderRadius,
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "0.2s all",
    backgroundColor: disabled ? "#f5f5f5" : "white",
    ...style,
  };

  const handleFocus = (e) => {
    e.currentTarget.style.borderColor = "#0070f3";
    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,112,243,0.3)";
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = "#ccc";
    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={baseStyle}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
