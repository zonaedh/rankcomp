"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, AlertCircle, Copy, Check, Target, TrendingUp, ArrowDown, Lock } from "lucide-react";
import ResultCard from "./ResultCard";
import StatusBadge from "./StatusBadge";
import { ProductionCompetitorReport } from "@/lib/services/reportAggregator";

interface AISummaryCardProps {
  aiSummary: ProductionCompetitorReport["aiSummary"] & {
    opportunityValue?: string;
    quickWin?: string;
  };
  delay?: number;
}

export default function AISummaryCard({
  aiSummary,
  delay = 0.4,
}: AISummaryCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(aiSummary.executiveSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const oppValue = aiSummary.opportunityValue || "$14,000 – $32,000 / mo";

  return (
    <ResultCard
      title="AI Executive Summary"
      subtitle="Synthesized competitor strategy & gaps"
      delay={delay}
      icon={<Sparkles className="w-5 h-5 text-[#F0511F]" />}
      badge={<StatusBadge status="optimal" customText="AI Synthesized" />}
    >
      <div className="space-y-4 pt-1">
        {/* Estimated Market Opportunity Callout Banner */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-xs">
          <div className="flex items-center gap-2 font-bold text-[var(--text-primary)]">
            <TrendingUp className="w-4 h-4 text-[#F0511F]" />
            <span>Est. Market Opportunity:</span>
          </div>
          <span className="font-black text-[#F0511F] text-xs sm:text-sm font-heading">
            {oppValue}
          </span>
        </div>

        {/* Main AI generated text block */}
        <div className="relative p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed space-y-2">
          <div className="font-bold text-[#F0511F] flex items-center justify-between">
            <span className="font-heading text-sm">{aiSummary.headline}</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F0511F] hover:text-[#F58458] transition-colors cursor-pointer bg-[var(--surface)] px-2.5 py-1 rounded-lg border border-[var(--border-theme)] shadow-2xs"
              title="Copy executive summary"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#F0511F]" />
                  <span className="text-[#F0511F]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[var(--text-secondary)] text-xs sm:text-[13px] leading-relaxed font-sans">
            {aiSummary.executiveSummary}
          </p>
        </div>

        {/* Strengths & Vulnerabilities Key Takeaways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#F0511F]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F0511F]" />
              <span>Primary Strength</span>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed text-[11px] sm:text-xs">
              {aiSummary.strengths[0]}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-500">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Exploitable Gap</span>
            </div>
            <p className="text-rose-400 leading-relaxed text-[11px] sm:text-xs">
              {aiSummary.vulnerabilities[0]}
            </p>
          </div>
        </div>

        {/* Strategic Counter-Play Pill */}
        <div className="p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] flex items-center gap-2 text-xs text-[var(--text-primary)]">
          <Target className="w-4 h-4 text-[#F0511F] shrink-0" />
          <span className="font-medium truncate text-xs">
            <strong className="text-[#F0511F]">Recommended Counter:</strong> {aiSummary.recommendedCounterStrategy}
          </span>
        </div>

        {/* High-Converting Curiosity Teaser Banner */}
        <div className="pt-1">
          <Link
            href="#unlock-section"
            className="w-full p-3 rounded-xl bg-[var(--highlight-bg)] hover:bg-[#F0511F]/20 border border-[var(--highlight-border)] text-xs font-bold text-[var(--text-primary)] hover:text-[#F0511F] flex items-center justify-between transition-all group cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#F0511F]" />
              <span>Full 90-Day Action Strategy Playbook & Ad Archive</span>
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-[#F0511F] group-hover:translate-x-0.5 transition-transform text-xs">
              <span>Unlock Free</span>
              <ArrowDown className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>
    </ResultCard>
  );
}
