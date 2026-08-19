"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepState = "pending" | "active" | "completed";

interface ProgressStepProps {
  stepNumber: number;
  label: string;
  sublabel?: string;
  state: StepState;
}

export default function ProgressStep({
  stepNumber,
  label,
  sublabel,
  state,
}: ProgressStepProps) {
  return (
    <div className="flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300">
      {/* Icon Indicator */}
      <div className="shrink-0">
        {state === "completed" ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-xs"
          >
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          </motion.div>
        ) : state === "active" ? (
          <div className="w-8 h-8 rounded-full bg-[var(--highlight-bg)] text-[#DA7735] border border-[var(--highlight-border)] flex items-center justify-center shadow-xs">
            <Loader2 className="w-4 h-4 animate-spin text-[#DA7735]" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-[var(--surface-subtle)] text-[var(--text-subtle)] border border-[var(--border-theme)] flex items-center justify-center text-xs font-bold font-heading">
            {stepNumber}
          </div>
        )}
      </div>

      {/* Label & Details */}
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "text-sm font-semibold transition-colors duration-200",
            state === "completed"
              ? "text-[var(--text-primary)]"
              : state === "active"
              ? "text-[#E7AD72] font-bold"
              : "text-[var(--text-subtle)]"
          )}
        >
          {label}
        </div>
        {sublabel && state === "active" && (
          <motion.div
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-[#DA7735] mt-0.5 animate-pulse"
          >
            {sublabel}
          </motion.div>
        )}
        {state === "completed" && (
          <div className="text-xs text-[var(--text-secondary)] mt-0.5">
            Verified & synchronized
          </div>
        )}
      </div>

      {/* Status Pill */}
      <div className="shrink-0">
        {state === "completed" && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Done
          </span>
        )}
        {state === "active" && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--highlight-bg)] text-[#E7AD72] border border-[var(--highlight-border)] animate-pulse">
            Analyzing...
          </span>
        )}
        {state === "pending" && (
          <span className="text-[11px] font-medium text-[var(--text-subtle)]">
            Queued
          </span>
        )}
      </div>
    </div>
  );
}
