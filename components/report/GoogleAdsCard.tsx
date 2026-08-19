import { Search, Tag, Check, X, ShieldAlert, Code } from "lucide-react";
import ResultCard from "./ResultCard";
import { ProductionCompetitorReport } from "@/lib/services/reportAggregator";

interface GoogleAdsCardProps {
  googleAds: ProductionCompetitorReport["googleAds"];
  delay?: number;
}

export default function GoogleAdsCard({
  googleAds,
  delay = 0.2,
}: GoogleAdsCardProps) {
  return (
    <ResultCard
      title="Google Ads Visibility"
      subtitle="Search network & Shopping campaign check"
      delay={delay}
      icon={<Search className="w-5 h-5 text-[#E06859]" />}
      badge={
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-2xs ${
            googleAds.isRunning
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-rose-500/10 text-rose-400 border-rose-500/30"
          }`}
        >
          {googleAds.isRunning ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
              <span>Active on Search</span>
            </>
          ) : (
            <>
              <X className="w-3.5 h-3.5 text-rose-400 stroke-[3]" />
              <span>Zero Search Ads</span>
            </>
          )}
        </span>
      }
    >
      <div className="space-y-4 pt-1">
        {/* Status Highlights */}
        <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#E06859] uppercase tracking-wider">Search Presence</span>
            <span className="font-bold text-[var(--text-primary)]">{googleAds.searchImpressionShare}</span>
          </div>
          <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed font-sans">
            {googleAds.strategyNote}
          </p>
        </div>

        {/* Detected Target Keywords */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-[var(--text-secondary)] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#E06859]" />
              <span>{googleAds.isRunning ? "Identified High-Intent Keywords:" : "Organic Search Terms (Zero Paid Bids):"}</span>
            </span>
            <span className="text-xs font-bold text-[#E06859]">
              {googleAds.detectedKeywordsCount} Signals
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {googleAds.topKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--surface)] border border-[var(--border-theme)] text-[var(--text-primary)] flex items-center gap-1 shadow-2xs"
              >
                <span className="text-[#E06859] font-bold">#</span>
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Detected Tracking Tags */}
        {googleAds.detectedTagIds && googleAds.detectedTagIds.length > 0 && (
          <div className="p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Code className="w-4 h-4 text-[#E06859] shrink-0" />
            <span className="truncate">
              <strong>Verified Tracking Tags:</strong> {googleAds.detectedTagIds.join(", ")}
            </span>
          </div>
        )}

        {!googleAds.isRunning && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-400 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>High Opportunity Gap:</strong> This competitor is not bidding on Google Search. You can target their brand keywords and prospective customers at very low cost-per-click.
            </p>
          </div>
        )}
      </div>
    </ResultCard>
  );
}
