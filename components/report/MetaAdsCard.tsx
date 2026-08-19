import { Megaphone, Layers, ShieldCheck } from "lucide-react";
import ResultCard from "./ResultCard";
import StatusBadge from "./StatusBadge";
import { ProductionCompetitorReport } from "@/lib/services/reportAggregator";

interface MetaAdsCardProps {
  metaAds: ProductionCompetitorReport["metaAds"];
  delay?: number;
}

export default function MetaAdsCard({ metaAds, delay = 0.1 }: MetaAdsCardProps) {
  const isRunning = metaAds.isRunning;
  const isPixelOnly = metaAds.pixelDetected && !isRunning;
  const pixelId = metaAds.pixelIds && metaAds.pixelIds.length > 0 ? metaAds.pixelIds[0] : null;

  return (
    <ResultCard
      title="Meta Ads Intelligence"
      subtitle="Facebook & Instagram Ad Library scan"
      delay={delay}
      icon={<Megaphone className="w-5 h-5 text-[#DA7735]" />}
      badge={
        <StatusBadge
          status={isRunning ? "running" : isPixelOnly ? "warning" : "not_running"}
          customText={
            isRunning
              ? "Active Campaigns"
              : isPixelOnly
              ? "Pixel Active (0 Live Ads)"
              : "No Active Ads"
          }
        />
      }
    >
      <div className="space-y-4 pt-1">
        {/* Scannable 2-Column Key Metrics Box */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[var(--highlight-bg)] border border-[var(--highlight-border)]">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-[#DA7735] uppercase tracking-wider">
              {isRunning ? "Active Creatives" : "Ad Library Status"}
            </div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-[var(--text-primary)]">
              {metaAds.activeCount}
            </div>
            <div className="text-xs text-[var(--text-secondary)] font-medium">
              {isRunning ? "Live Ad Variations" : "Zero Live Creatives"}
            </div>
          </div>

          <div className="space-y-1 text-right">
            <div className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Est. Monthly Spend
            </div>
            <div className="text-base sm:text-lg font-black font-heading text-[#E7AD72] mt-1">
              {metaAds.estimatedMonthlySpend}
            </div>
            <div className="text-[11px] text-[var(--text-secondary)] font-medium">
              {isRunning ? metaAds.primaryPlatform : "No Active Spend"}
            </div>
          </div>
        </div>

        {/* Pixel Status Indicator */}
        {metaAds.pixelDetected && (
          <div className="p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#DA7735]" />
              <span>
                <strong>Meta Pixel:</strong> {isRunning ? "Installed & Actively Tracking" : "Installed (Audience Retargeting Only)"}
              </span>
            </div>
            {pixelId && (
              <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border-theme)] text-[var(--text-primary)]">
                ID: {pixelId}
              </span>
            )}
          </div>
        )}

        {/* Ad Formats Tags */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-[var(--text-secondary)] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#DA7735]" />
              <span>Observed Placements & Formats:</span>
            </span>
            <span className="text-[11px] text-[#DA7735] font-bold">
              {metaAds.topFormats.length} Formats
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {metaAds.topFormats.map((fmt, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--surface-subtle)] border border-[var(--border-theme)] text-[var(--text-primary)]"
              >
                {fmt}
              </span>
            ))}
          </div>
        </div>

        {/* Ad Copy Hook Sample */}
        {metaAds.adCopySample && (
          <div className="p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
              Active Ad Copy Hook Sample
            </div>
            <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed">
              &ldquo;{metaAds.adCopySample}&rdquo;
            </p>
          </div>
        )}
      </div>
    </ResultCard>
  );
}
