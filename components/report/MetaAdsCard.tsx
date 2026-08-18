import { Megaphone, Layers, Quote, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
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
      icon={<Megaphone className="w-5 h-5 text-[#F0511F]" />}
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
            <div className="text-[11px] font-bold text-[#F0511F] uppercase tracking-wider">
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
            <div className="text-base sm:text-lg font-black font-heading text-[#F0511F] mt-1">
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
              <ShieldCheck className="w-4 h-4 text-[#F0511F]" />
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
              <Layers className="w-3.5 h-3.5 text-[#F0511F]" />
              <span>Observed Placements & Formats:</span>
            </span>
            <span className="text-[11px] text-[#F0511F] font-bold">
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

        {/* Creative Strategy Hook / Context Note */}
        {isRunning ? (
          <div className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
                <Quote className="w-3.5 h-3.5 text-[#F0511F]" />
                <span>Live Creative Copy Hook:</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#F0511F] bg-[var(--highlight-bg)] px-2 py-0.5 rounded-full border border-[var(--highlight-border)]">
                Live Angle
              </span>
            </div>
            <p className="text-[var(--text-secondary)] italic leading-relaxed text-xs sm:text-[13px]">
              &ldquo;{metaAds.adCopySample}&rdquo;
            </p>
          </div>
        ) : isPixelOnly ? (
          <div className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] text-xs text-[var(--text-secondary)] leading-relaxed">
            <p>
              Meta Pixel is active for collecting prospective audience data, but <strong>zero active ad variations</strong> are running in the official Meta Ad Library right now.
            </p>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] text-xs text-[var(--text-secondary)]">
            <p>No active Facebook or Instagram pixel conversion tags detected on this domain.</p>
          </div>
        )}

        {/* 1-Click Meta Ad Library Action Button */}
        {metaAds.adLibraryUrl && (
          <div className="space-y-2 pt-1">
            <a
              href={metaAds.adLibraryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[var(--highlight-bg)] hover:bg-[#F0511F]/20 border border-[var(--highlight-border)] text-[var(--text-primary)] font-bold text-xs flex items-center justify-between transition-all group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F0511F]" />
                <span>
                  {isRunning
                    ? "Inspect Live Creatives in Meta Ad Library"
                    : isPixelOnly
                    ? "Verify in Meta Ad Library (0 Active)"
                    : "Check Meta Ad Library Archive"}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-[#F0511F] group-hover:translate-x-1 transition-transform text-xs">
                <span>Open Archive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* 3-Tier Multi-Query Alternative Pills */}
            {metaAds.alternateQueries && metaAds.alternateQueries.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] flex-wrap pt-0.5">
                <span className="font-semibold text-[var(--text-primary)]">Alt Searches:</span>
                {metaAds.alternateQueries.map((alt, idx) => (
                  <a
                    key={idx}
                    href={alt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-[var(--surface)] hover:bg-[var(--highlight-bg)] border border-[var(--border-theme)] hover:border-[var(--highlight-border)] text-[var(--text-primary)] font-medium inline-flex items-center gap-1 transition-colors text-xs"
                    title={`Search ${alt.label} in Meta Ad Library`}
                  >
                    <span>{alt.label}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#F0511F]" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ResultCard>
  );
}
