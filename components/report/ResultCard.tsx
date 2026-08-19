"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ResultCard({
  title,
  subtitle,
  badge,
  icon,
  children,
  className,
  delay = 0,
}: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      className={cn(
        "bg-[var(--surface-card)] rounded-2xl border border-[var(--border-theme)] p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-black/40 hover:border-[var(--border-hover)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group",
        className
      )}
    >
      {/* Subtle top card accent highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border-theme)] flex items-center justify-center text-[#E06859] shrink-0 group-hover:scale-105 group-hover:border-[var(--border-accent)] group-hover:bg-[var(--highlight-bg)] transition-all duration-200">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-[var(--text-primary)] tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          {badge && <div className="shrink-0">{badge}</div>}
        </div>

        {/* Content */}
        <div className="space-y-4">{children}</div>
      </div>
    </motion.div>
  );
}
