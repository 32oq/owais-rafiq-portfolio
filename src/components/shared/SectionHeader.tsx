"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 tag">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg text-text-muted leading-relaxed",
            align === "center" && "max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
