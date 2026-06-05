"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
  animated?: boolean;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  trackClassName,
  fillClassName,
  animated = true,
  label,
  showValue = false,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fillRef.current || !animated) return;
    const timer = setTimeout(() => {
      if (fillRef.current) {
        fillRef.current.style.width = `${percent}%`;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [percent, animated]);

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
          {showValue && (
            <span className="text-xs text-text-muted font-mono">{Math.round(percent)}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          "h-1.5 w-full rounded-full overflow-hidden",
          "bg-surface-2",
          trackClassName
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          ref={fillRef}
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            animated ? "w-0" : `w-[${percent}%]`,
            fillClassName ?? "bg-accent"
          )}
          style={!animated ? { width: `${percent}%` } : undefined}
        />
      </div>
    </div>
  );
}
