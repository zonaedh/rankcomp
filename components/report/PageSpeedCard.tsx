import { Gauge, Activity, ExternalLink } from "lucide-react";
import ResultCard from "./ResultCard";
import GaugeScore from "./GaugeScore";
import StatusBadge from "./StatusBadge";
import { ProductionCompetitorReport } from "@/lib/services/reportAggregator";

interface PageSpeedCardProps {
  pageSpeed: ProductionCompetitorReport["pageSpeed"];
  delay?: number;
}

export default function PageSpeedCard({
  pageSpeed,
  delay = 0.3,
}: PageSpeedCardProps) {
  const isGood = pageSpeed.mobileScore >= 80 && pageSpeed.desktopScore >= 85;

  return (
    <ResultCard
      title="PageSpeed & Web Vitals"
      subtitle="Google Lighthouse benchmark metrics"
      delay={delay}
      icon={<Gauge className="w-5 h-5 text-[#DA7735]" />}
      badge={
        <StatusBadge
          status={isGood ? "good" : "warning"}
          customText={pageSpeed.status}
        />
      }
    >
      <div className="space-y-4 pt-1">
        {/* Dual Gauges: Mobile & Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <GaugeScore score={pageSpeed.mobileScore} device="mobile" />
          <GaugeScore score={pageSpeed.desktopScore} device="desktop" />
        </div>

        {/* Core Web Vitals Micro-table */}
        <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] text-xs space-y-3">
          <div className="flex items-center justify-between text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#DA7735]" />
              <span>Core Web Vitals Telemetry</span>
            </div>
            {pageSpeed.insightsUrl && (
              <a
                href={pageSpeed.insightsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#DA7735] hover:text-[#E7AD72] normal-case transition-colors text-xs"
              >
                <span>Google Lighthouse Report</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-[var(--surface)] p-2.5 rounded-xl border border-[var(--border-theme)] shadow-2xs">
              <div className="text-[10px] text-[var(--text-subtle)] font-bold uppercase tracking-wide">FCP (Paint)</div>
              <div className="text-sm sm:text-base font-black text-[var(--text-primary)] mt-1 font-heading">{pageSpeed.fcp}</div>
              <div className="text-[10px] text-[var(--text-subtle)] mt-0.5">Target &lt; 1.8s</div>
            </div>
            <div className="bg-[var(--surface)] p-2.5 rounded-xl border border-[var(--border-theme)] shadow-2xs">
              <div className="text-[10px] text-[var(--text-subtle)] font-bold uppercase tracking-wide">LCP (Load)</div>
              <div className="text-sm sm:text-base font-black text-[var(--text-primary)] mt-1 font-heading">{pageSpeed.lcp}</div>
              <div className="text-[10px] text-[var(--text-subtle)] mt-0.5">Target &lt; 2.5s</div>
            </div>
            <div className="bg-[var(--surface)] p-2.5 rounded-xl border border-[var(--border-theme)] shadow-2xs">
              <div className="text-[10px] text-[var(--text-subtle)] font-bold uppercase tracking-wide">CLS (Shift)</div>
              <div className="text-sm sm:text-base font-black text-[var(--text-primary)] mt-1 font-heading">{pageSpeed.cls}</div>
              <div className="text-[10px] text-[var(--text-subtle)] mt-0.5">Target &lt; 0.1</div>
            </div>
          </div>
        </div>
      </div>
    </ResultCard>
  );
}
