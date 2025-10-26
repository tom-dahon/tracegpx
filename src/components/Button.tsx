// components/Button.tsx
"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;           // Custom background color (optional)
  textColor?: string;       // Custom text color (optional)
}

/**
 * Generic, accessible, and style-safe Button component.
 * Combines Tailwind defaults with optional inline customization.
 */
export default function Button({
  children,
  color,
  textColor,
  disabled = false,
  className,
  style,
  ...props
}: ButtonProps) {
  const dynamicStyle: React.CSSProperties = {
    backgroundColor: color,
    color: textColor,
    ...style,
  };

  return (
    <button
      {...props}
      disabled={disabled}
      style={dynamicStyle}
      className={clsx(
        // Base styles
        "px-4 py-2 rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        // Disabled styles
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:opacity-90 active:scale-[0.98]",
        // Tailwind color fallback (if no inline color)
        !color && "bg-blue-500 text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
