"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Calendar, ArrowLeft, Share2, Check } from "lucide-react";
import ScoreBadge from "@/components/report/ScoreBadge";
import MetaAdsCard from "@/components/report/MetaAdsCard";
import GoogleAdsCard from "@/components/report/GoogleAdsCard";
import PageSpeedCard from "@/components/report/PageSpeedCard";
import AISummaryCard from "@/components/report/AISummaryCard";
import UnlockReportSection from "@/components/report/UnlockReportSection";
import { PRESET_REPORTS, getCompetitorReport } from "@/lib/mockData";

export default function DemoPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>("strideapparel.com");
  const [copiedLink, setCopiedLink] = useState(false);

  const report = PRESET_REPORTS[selectedDomain] || getCompetitorReport(selectedDomain);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const demoPresets = [
    { domain: "strideapparel.com", label: "Stride Apparel (Fashion)", score: 84 },
    { domain: "gymshark.com", label: "Gymshark (Athletic)", score: 92 },
    { domain: "glossier.com", label: "Glossier (Beauty)", score: 87 },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 bg-[var(--bg-base)] transition-colors duration-300">
      {/* Demo Banner */}
      <div className="bg-[var(--surface-card)] border border-[var(--border-theme)] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--highlight-bg)] text-[#E06859] border border-[var(--highlight-border)] flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5 text-[#E06859]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FDA4AF]">
                Sample Reports Library
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--highlight-bg)] text-[#FDA4AF] border border-[var(--highlight-border)]">
                Live Preview
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
              Viewing pre-cached sample audits. Switch between preset brand niches below:
            </p>
          </div>
        </div>

        {/* Brand Niche Switcher */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {demoPresets.map((preset) => (
            <button
              key={preset.domain}
              onClick={() => setSelectedDomain(preset.domain)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDomain === preset.domain
                  ? "bg-[#E06859] text-white shadow-xs"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-theme)] hover:border-[#E06859]/40"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[var(--border-theme)]">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[#FDA4AF] px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border-theme)] shadow-2xs hover:bg-[var(--highlight-bg)] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Analyze Another Competitor</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{report.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#E06859]" />
              {report.analyzedAt}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-primary)] bg-[var(--surface)] border border-[var(--border-theme)] hover:bg-[var(--highlight-bg)] transition-all cursor-pointer shadow-2xs"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#E06859]" />
                <span className="text-[#FDA4AF]">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#E06859]" />
                <span>Share Demo</span>
              </>
            )}
          </button>

          <Link
            href="#unlock-section"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#E06859] hover:bg-[#D4594A] transition-all shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Unlock Dossier & Free 1:1 Call</span>
          </Link>
        </div>
      </div>

      {/* Header Overall Scoreboard Badge */}
      <ScoreBadge
        key={report.domain}
        score={report.overallScore}
        grade={report.scoreGrade}
        verdict={report.scoreVerdict}
        domain={report.domain}
      />

      {/* 4 Core Result Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-heading text-[var(--text-primary)]">
            Core Intelligence Signals (Executive Preview)
          </h2>
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            4 modules verified
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetaAdsCard key={`meta-${report.domain}`} metaAds={report.metaAds} delay={0.1} />
          <GoogleAdsCard key={`google-${report.domain}`} googleAds={report.googleAds} delay={0.2} />
          <PageSpeedCard key={`speed-${report.domain}`} pageSpeed={report.pageSpeed} delay={0.3} />
          <AISummaryCard key={`ai-${report.domain}`} aiSummary={report.aiSummary} delay={0.4} />
        </div>
      </div>

      {/* Unlock Full Report Lead Magnet Section */}
      <div id="unlock-section">
        <UnlockReportSection domain={report.domain} />
      </div>
    </div>
  );
}
