"use client";

import { motion } from "framer-motion";
import { Smartphone, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

interface GaugeScoreProps {
  score: number; // 0 - 100
  device: "mobile" | "desktop";
  label?: string;
  size?: "sm" | "md";
}

export default function GaugeScore({
  score,
  device,
  label,
  size = "md",
}: GaugeScoreProps) {
  const getRating = (s: number) => {
    if (s >= 80)
      return {
        color: "#10B981",
        textClass: "text-emerald-400",
        bgClass: "bg-emerald-500/10 border-emerald-500/30",
        label: "Fast",
      };
    if (s >= 60)
      return {
        color: "#F59E0B",
        textClass: "text-amber-400",
        bgClass: "bg-amber-500/10 border-amber-500/30",
        label: "Average",
      };
    return {
      color: "#E06859",
      textClass: "text-rose-400",
      bgClass: "bg-rose-500/10 border-rose-500/30",
      label: "Slow",
    };
  };

  const rating = getRating(score);
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] transition-all hover:bg-[var(--surface)] hover:shadow-xs">
      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 74 74">
          <circle
            cx="37"
            cy="37"
            r={radius}
            className="text-[var(--border-theme)]"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
          />
          <motion.circle
            cx="37"
            cy="37"
            r={radius}
            stroke={rating.color}
            strokeWidth="5"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <span className={cn("absolute text-sm font-extrabold font-heading", rating.textClass)}>
          {score}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)]">
          {device === "mobile" ? (
            <Smartphone className="w-3.5 h-3.5 text-[#E06859]" />
          ) : (
            <Monitor className="w-3.5 h-3.5 text-[#E06859]" />
          )}
          <span>{device === "mobile" ? "Mobile Performance" : "Desktop Performance"}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold border", rating.bgClass, rating.textClass)}>
            {rating.label}
          </span>
          <span className="text-[11px] text-[var(--text-secondary)]">
            {score >= 80 ? "Zero Bottlenecks" : score >= 60 ? "Heavy Media Assets" : "High Drop-off Risk"}
          </span>
        </div>
      </div>
    </div>
  );
}
