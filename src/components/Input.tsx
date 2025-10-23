'use client';
import React, { CSSProperties, ChangeEvent } from "react";

interface InputProps {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
  padding?: string;
  borderRadius?: string;
  disabled?: boolean;
  style?: CSSProperties;
  type?: string;
}

export default function Input({
  value,
  onChange,
  placeholder = "",
  width = "100%",
  padding = "12px 16px",
  borderRadius = "8px",
  disabled = false,
  style = {},
  type = "text",
}: InputProps) {
  const baseStyle: CSSProperties = {
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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#0070f3";
    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,112,243,0.3)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
