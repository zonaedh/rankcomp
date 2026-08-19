"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number; // 0 - 100
  grade: "A" | "B" | "C" | "D";
  verdict: string;
  domain: string;
}

export default function ScoreBadge({
  score,
  grade,
  verdict,
  domain,
}: ScoreBadgeProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900;
    const stepTime = 15;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Determine score colors in clean Porsche & Emerald luxury palette
  const getColor = (s: number) => {
    if (s >= 80)
      return {
        stroke: "#10B981",
        text: "text-emerald-400",
        label: "Market Leader",
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        subtext: "Aggressive advertising and fast site performance",
      };
    if (s >= 65)
      return {
        stroke: "#DA7735",
        text: "text-[#E7AD72]",
        label: "Active Competitor",
        badge: "bg-[var(--highlight-bg)] text-[#E7AD72] border-[var(--highlight-border)]",
        subtext: "Consistent marketing with minor speed or search gaps",
      };
    if (s >= 50)
      return {
        stroke: "#E19456",
        text: "text-[#E19456]",
        label: "Moderate Activity",
        badge: "bg-amber-500/10 text-[#E19456] border-amber-500/30",
        subtext: "Low ad scale or slower mobile experience",
      };
    return {
      stroke: "#CC602A",
      text: "text-[#F3D6B5]",
      label: "Vulnerable Presence",
      badge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      subtext: "High opportunity to easily outrank and outperform",
    };
  };

  const theme = getColor(score);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-3xl bg-[var(--surface-card)] border border-[var(--border-theme)] p-6 sm:p-8 md:p-9 shadow-sm overflow-hidden transition-all"
    >
      {/* Top subtle decorative accent glow in Porsche amber */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent pointer-events-none" />

      {/* Ambient background glow orb */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-bl from-[var(--highlight-bg)] to-transparent rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 8 Cols: Target Domain & Executive Verdict */}
        <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
          {/* Domain Pill & Status */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-theme)] text-xs font-semibold text-[var(--text-primary)]">
              <Globe className="w-3.5 h-3.5 text-[#DA7735]" />
              <span>{domain}</span>
            </span>

            <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", theme.badge)}>
              Grade {grade} • {theme.label}
            </span>

            <span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DA7735]" />
              <span>Verified Public Telemetry</span>
            </span>
          </div>

          {/* Clean Main Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
              Competitor Performance Scorecard
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 leading-relaxed max-w-2xl font-sans">
              {verdict}
            </p>
          </div>

          {/* 3 Quick Micro Metric Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-[var(--text-secondary)]">
            <div className="px-3 py-1.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DA7735]"></span>
              <span><strong>Meta Ads:</strong> Scanned</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DA7735]"></span>
              <span><strong>Google Search:</strong> Inspected</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DA7735]"></span>
              <span><strong>PageSpeed:</strong> Measured</span>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Prominent Circular Scoreboard Card */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="w-full max-w-xs bg-[var(--surface-subtle)] p-5 sm:p-6 rounded-2xl border border-[var(--border-theme)] flex items-center gap-5 shadow-2xs">
            {/* Circular SVG Gauge */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 110 110">
                {/* Background Track */}
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  className="text-[var(--border-theme)]"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                {/* Animated Value Arc */}
                <motion.circle
                  cx="55"
                  cy="55"
                  r={radius}
                  stroke={theme.stroke}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-3xl font-black font-heading tracking-tight", theme.text)}>
                  {displayScore}
                </span>
                <span className="text-[10px] uppercase font-bold text-[var(--text-subtle)] -mt-1 tracking-wider">
                  / 100
                </span>
              </div>
            </div>

            {/* Score Text Info */}
            <div className="space-y-1 min-w-0">
              <div className="text-[11px] font-bold text-[#DA7735] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#DA7735]" />
                <span>Overall Score</span>
              </div>
              <div className="text-sm font-bold text-[var(--text-primary)] truncate font-heading">
                {theme.label}
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
                {theme.subtext}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
