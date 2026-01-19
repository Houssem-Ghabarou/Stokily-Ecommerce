"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
  className = "",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Handle keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
        onChange("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onChange]);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative flex items-center transition-all duration-200 ${
          isFocused ? "ring-2 ring-primary/20" : ""
        }`}
      >
        <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="search-input pr-20"
          aria-label="Search products"
        />
        {value ? (
          <button
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <kbd className="absolute right-3 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded border border-gray-200">
            <span className="text-[10px]">
              {typeof navigator !== "undefined" &&
              navigator.platform?.includes("Mac")
                ? "⌘"
                : "Ctrl"}
            </span>
            K
          </kbd>
        )}
      </div>
    </div>
  );
}

// Mobile search component (expandable)
interface MobileSearchProps {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileSearch({
  value,
  onChange,
  isOpen,
  onToggle,
}: MobileSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>
    );
  }

  return (
    <div className="absolute inset-x-0 top-0 z-50 bg-white px-4 py-3 shadow-lg border-b">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:bg-white focus:border-primary focus:outline-none"
          />
        </div>
        <button
          onClick={() => {
            onChange("");
            onToggle();
          }}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
