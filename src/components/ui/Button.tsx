"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/types";

const buttonVariants = {
  primary: "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-glow active:scale-[0.98]",
  secondary: "bg-surface-2 text-text-primary hover:bg-border border border-border active:scale-[0.98]",
  ghost: "text-text-muted hover:text-text-primary hover:bg-surface-2 active:scale-[0.98]",
  outline: "border border-accent text-accent hover:bg-accent hover:text-white active:scale-[0.98]",
  destructive: "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
};

const buttonSizes = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  icon: "h-10 w-10",
};

const baseClasses = (
  variant: keyof typeof buttonVariants,
  size: keyof typeof buttonSizes,
  className?: string
) =>
  cn(
    "relative inline-flex items-center justify-center font-medium rounded-lg",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none cursor-pointer",
    buttonVariants[variant],
    buttonSizes[size],
    className
  );

// ── When href is provided, render as <Link> or <a> ──────────────────────────

interface LinkButtonProps extends Omit<ButtonProps, "href"> {
  href: string;
  external?: boolean;
}

export function LinkButton({
  href,
  external = false,
  variant = "primary",
  size = "md",
  className,
  leftIcon,
  rightIcon,
  loading,
  children,
  ...rest
}: LinkButtonProps) {
  const classes = baseClasses(variant, size, className);
  const inner = (
    <>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </span>
      )}
      <span className={cn("flex items-center gap-inherit", loading && "invisible")}>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </span>
    </>
  );

  if (external || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...(rest as object)}>
      {inner}
    </Link>
  );
}

// ── Default export: plain <button> ──────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={baseClasses(variant, size, className)}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        )}
        <span className={cn("flex items-center gap-inherit", loading && "invisible")}>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
