"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Target,
  TrendingUp,
  ArrowDown,
  Lock,
  Zap,
  Calendar,
  MessageSquareQuote,
} from "lucide-react";
import ResultCard from "./ResultCard";
import StatusBadge from "./StatusBadge";
import { ProductionCompetitorReport } from "@/lib/services/reportAggregator";

interface AISummaryCardProps {
  aiSummary: ProductionCompetitorReport["aiSummary"] & {
    opportunityValue?: string;
    quickWin?: string;
    adHookIdea?: string;
    actionPlan?: {
      step1_immediate: string;
      step2_shortTerm: string;
      step3_scale: string;
    };
    threatLevel?: "High Threat" | "Moderate Threat" | "Low Threat";
    engineUsed?: "groq" | "gemini" | "openai" | "heuristic";
  };
  delay?: number;
}

export default function AISummaryCard({
  aiSummary,
  delay = 0.4,
}: AISummaryCardProps) {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedHook, setCopiedHook] = useState(false);
  const [activeTab, setActiveTab] = useState<"quickwin" | "roadmap" | "counter">("quickwin");

  const handleCopySummary = () => {
    navigator.clipboard.writeText(aiSummary.executiveSummary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleCopyHook = () => {
    if (aiSummary.adHookIdea) {
      navigator.clipboard.writeText(aiSummary.adHookIdea);
      setCopiedHook(true);
      setTimeout(() => setCopiedHook(false), 2000);
    }
  };

  const oppValue = aiSummary.opportunityValue || "$18,000 – $35,000 / mo";
  const threatBadgeText = aiSummary.threatLevel || "Moderate Threat";

  return (
    <ResultCard
      title="AI Strategic Playbook"
      subtitle="Plain-English competitor analysis & growth moves"
      delay={delay}
      icon={<Sparkles className="w-5 h-5 text-[#DA7735]" />}
      badge={
        <div className="flex items-center gap-1.5">
          <StatusBadge
            status={
              aiSummary.threatLevel === "High Threat"
                ? "warning"
                : aiSummary.threatLevel === "Low Threat"
                ? "optimal"
                : "good"
            }
            customText={threatBadgeText}
          />
        </div>
      }
    >
      <div className="space-y-4 pt-1">
        {/* Estimated Market Opportunity Callout Banner */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-xs">
          <div className="flex items-center gap-2 font-bold text-[var(--text-primary)]">
            <TrendingUp className="w-4 h-4 text-[#DA7735]" />
            <span>Estimated Revenue Opportunity:</span>
          </div>
          <span className="font-black text-[#E7AD72] text-xs sm:text-sm font-heading">
            {oppValue}
          </span>
        </div>

        {/* Plain English Executive Brief */}
        <div className="relative p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed space-y-2">
          <div className="font-bold text-[#DA7735] flex items-center justify-between gap-2">
            <span className="font-heading text-sm sm:text-base leading-snug">
              {aiSummary.headline}
            </span>
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#DA7735] hover:text-[#E7AD72] transition-colors cursor-pointer bg-[var(--surface)] px-2.5 py-1 rounded-lg border border-[var(--border-theme)] shadow-2xs shrink-0"
              title="Copy executive summary"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3 h-3 text-[#DA7735]" />
                  <span>Copied</span>
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

        {/* Plain-English Strengths & Money Leaks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {/* What They Do Well */}
          <div className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>What They Do Well</span>
            </div>
            <ul className="space-y-1 text-[var(--text-secondary)] text-[11px] sm:text-xs leading-relaxed">
              {aiSummary.strengths.slice(0, 2).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Where They Lose Money */}
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-rose-400">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Where They Are Losing Money</span>
            </div>
            <ul className="space-y-1 text-rose-300/90 text-[11px] sm:text-xs leading-relaxed">
              {aiSummary.vulnerabilities.slice(0, 2).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Growth Strategy Selector */}
        <div className="space-y-2.5 pt-1">
          {/* Tab Buttons */}
          <div className="flex items-center gap-1 p-1 bg-[var(--surface-subtle)] border border-[var(--border-theme)] rounded-xl text-xs">
            <button
              onClick={() => setActiveTab("quickwin")}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "quickwin"
                  ? "bg-[#DA7735] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>7-Day Quick Win</span>
            </button>
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "roadmap"
                  ? "bg-[#DA7735] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>3-Step Action Plan</span>
            </button>
            <button
              onClick={() => setActiveTab("counter")}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "counter"
                  ? "bg-[#DA7735] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Counter-Play</span>
            </button>
          </div>

          {/* Tab 1: 7-Day Quick Win & Copy-Paste Ad Hook */}
          {activeTab === "quickwin" && (
            <div className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-2.5 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#DA7735]">
                  <Zap className="w-3.5 h-3.5 text-[#DA7735]" />
                  <span>Immediate Move to Win Customers (Next 7 Days):</span>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed pl-5 text-[11px] sm:text-xs">
                  {aiSummary.quickWin || "Launch targeted comparison ads highlighting faster checkout and free shipping."}
                </p>
              </div>

              {/* Ready-to-Use Copy-Paste Ad Hook */}
              {aiSummary.adHookIdea && (
                <div className="p-3 rounded-lg bg-[var(--highlight-bg)] border border-[var(--highlight-border)] space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[var(--text-primary)]">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <MessageSquareQuote className="w-3.5 h-3.5 text-[#DA7735]" />
                      <span>Ready-to-Use Ad Headline / Hook:</span>
                    </span>
                    <button
                      onClick={handleCopyHook}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#DA7735] hover:text-[#E7AD72] transition-colors cursor-pointer bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border-theme)] shadow-2xs"
                      title="Copy ad hook"
                    >
                      {copiedHook ? (
                        <>
                          <Check className="w-3 h-3 text-[#DA7735]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Hook</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[var(--text-primary)] italic text-[11px] sm:text-xs leading-relaxed font-sans">
                    &ldquo;{aiSummary.adHookIdea}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: 3-Step Action Roadmap */}
          {activeTab === "roadmap" && (
            <div className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#DA7735] mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#DA7735]" />
                <span>Step-by-Step Growth Plan:</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border-theme)]">
                  <span className="font-bold text-[#DA7735] block text-[10px] uppercase tracking-wider mb-0.5">
                    Phase 1 (Days 1–7):
                  </span>
                  <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                    {aiSummary.actionPlan?.step1_immediate || aiSummary.quickWin || "Run high-intent Google Search ads on their popular search terms."}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border-theme)]">
                  <span className="font-bold text-[#E19456] block text-[10px] uppercase tracking-wider mb-0.5">
                    Phase 2 (Days 14–30):
                  </span>
                  <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                    {aiSummary.actionPlan?.step2_shortTerm || "Deploy a fast mobile comparison page highlighting your advantages."}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border-theme)]">
                  <span className="font-bold text-emerald-400 block text-[10px] uppercase tracking-wider mb-0.5">
                    Phase 3 (Day 60+):
                  </span>
                  <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                    {aiSummary.actionPlan?.step3_scale || "Scale video ads on Instagram & TikTok to build long-term brand loyalty."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Counter-Play */}
          {activeTab === "counter" && (
            <div className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#DA7735]">
                <Target className="w-3.5 h-3.5 text-[#DA7735]" />
                <span>Recommended Strategy:</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed text-[11px] sm:text-xs">
                {aiSummary.recommendedCounterStrategy}
              </p>
            </div>
          )}
        </div>

        {/* High-Converting Curiosity Teaser Banner */}
        <div className="pt-1">
          <Link
            href="#unlock-section"
            className="w-full p-3 rounded-xl bg-[var(--highlight-bg)] hover:bg-[var(--highlight-border)] border border-[var(--highlight-border)] text-xs font-bold text-[var(--text-primary)] hover:text-[#E7AD72] flex items-center justify-between transition-all group cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#DA7735]" />
              <span>Full 18-Page Dossier + Free 30-Min 1:1 Strategy Call</span>
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-[#DA7735] group-hover:translate-x-0.5 transition-transform text-xs">
              <span>Claim Free ($497)</span>
              <ArrowDown className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>
    </ResultCard>
  );
}
