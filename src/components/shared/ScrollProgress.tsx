"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

export function ScrollProgress({ className }: { className?: string }) {
  const progress = useScrollProgress();

  return (
    <div
      className={cn("fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent pointer-events-none", className)}
    >
      <div
        className="h-full bg-accent transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
