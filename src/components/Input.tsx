'use client';
import React, { ChangeEvent } from "react";
import clsx from "clsx";

interface InputProps {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
}

export default function Input({
  value,
  onChange,
  placeholder = "",
  disabled = false,
  type = "text",
  className = "",
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={clsx(
        // Style de base
        "w-full px-4 py-3 rounded-lg border border-gray-300 text-base shadow-sm outline-none transition-all duration-200",
        // Harmonisation mobile pour type=date
        type === "datetime-local" && "appearance-none min-w-0 max-w-full",
        // États
        "focus:border-blue-500 focus:shadow-md focus:shadow-blue-200",
        disabled && "bg-gray-100 cursor-not-allowed opacity-75",
        className // Permet d’ajouter des classes personnalisées si besoin
      )}
    />
  );
}
