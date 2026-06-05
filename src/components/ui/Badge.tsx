import { cn } from "@/lib/utils";
import type { BadgeProps } from "@/types";

const badgeVariants = {
  default: "bg-surface-2 text-text-muted border border-border",
  primary: "bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800",
  success: "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  warning: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  error: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  outline: "bg-transparent text-text-muted border border-border",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "badge-base font-medium transition-colors",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
