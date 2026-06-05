"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "rounded-lg bg-surface-2",
          size === "sm" ? "h-8 w-8" : "h-9 w-9",
          className
        )}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg",
        "text-text-muted hover:text-text-primary",
        "bg-transparent hover:bg-surface-2",
        "border border-transparent hover:border-border",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        size === "sm" ? "h-8 w-8" : "h-9 w-9",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
      {isDark ? (
        <Sun size={size === "sm" ? 15 : 16} className="transition-transform duration-200 rotate-0 scale-100" />
      ) : (
        <Moon size={size === "sm" ? 15 : 16} className="transition-transform duration-200 rotate-0 scale-100" />
      )}
    </button>
  );
}
