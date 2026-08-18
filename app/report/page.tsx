"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, RefreshCw, Share2, Check, Printer, Sparkles, AlertTriangle } from "lucide-react";
import ScoreBadge from "@/components/report/ScoreBadge";
import MetaAdsCard from "@/components/report/MetaAdsCard";
import GoogleAdsCard from "@/components/report/GoogleAdsCard";
import PageSpeedCard from "@/components/report/PageSpeedCard";
import AISummaryCard from "@/components/report/AISummaryCard";
import UnlockReportSection from "@/components/report/UnlockReportSection";
import { formatDomain } from "@/lib/utils";
import { ProductionCompetitorReport } from "@/lib/services/reportAggregator";

function ReportContent() {
  const searchParams = useSearchParams();
  const rawDomain = searchParams.get("domain") || "strideapparel.com";
  const domain = formatDomain(rawDomain);

  const [report, setReport] = useState<ProductionCompetitorReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchReport = async () => {
    setIsLoading(true);
    setError(null);

    // Check if session storage already has the fresh report
    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem(`rankcomp_report_${domain}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.domain === domain) {
            setReport(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // ignore
      }
    }

    try {
      const res = await fetch(`/api/analyze?domain=${encodeURIComponent(domain)}`);
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to load audit report for this domain.");
      }

      setReport(data);

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(`rankcomp_report_${domain}`, JSON.stringify(data));
        } catch {
          // ignore
        }
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch live audit metrics.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [domain]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-[#F0511F]/20 border-t-[#F0511F] rounded-full animate-spin" />
            <Sparkles className="w-6 h-6 text-[#F0511F] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-heading">Generating Live Intelligence</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Connecting to Google PageSpeed, Meta ad registries, and AI synthesis for <span className="font-semibold text-[#F0511F]">{domain}</span>...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[var(--surface-card)] border border-rose-500/30 shadow-xl text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-heading text-[var(--text-primary)]">Audit Unavailable</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {error || "Could not retrieve audit data for the specified domain."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={fetchReport}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#781E16] to-[#F0511F] hover:from-[#410C09] hover:to-[#E23814] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Audit</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-[var(--text-secondary)] bg-[var(--surface)] border border-[var(--border-theme)] hover:bg-[var(--highlight-bg)] transition-all text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 bg-[var(--bg-base)] transition-colors duration-300">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[var(--border-theme)] print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[#F0511F] px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border-theme)] shadow-2xs hover:bg-[var(--highlight-bg)] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Analyze Another</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{report.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#F0511F]" />
              {report.analyzedAt}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Print / Save to PDF */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-[#F0511F] bg-[var(--surface)] border border-[var(--border-theme)] hover:bg-[var(--highlight-bg)] transition-all cursor-pointer shadow-2xs"
            title="Print or Export PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#F0511F]" />
            <span>Print Report</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-primary)] bg-[var(--surface)] border border-[var(--border-theme)] hover:bg-[var(--highlight-bg)] transition-all cursor-pointer shadow-2xs"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#F0511F]" />
                <span className="text-[#F0511F]">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#F0511F]" />
                <span>Share Snapshot</span>
              </>
            )}
          </button>

          <Link
            href="#unlock-section"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#781E16] to-[#F0511F] hover:from-[#410C09] hover:to-[#E23814] transition-all shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FBCAAD]" />
            <span>Unlock Full PDF</span>
          </Link>
        </div>
      </div>

      {/* Header Overall Scoreboard Badge */}
      <ScoreBadge
        score={report.overallScore}
        grade={report.scoreGrade}
        verdict={report.scoreVerdict}
        domain={report.domain}
      />

      {/* 4 Core Result Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-heading text-[var(--text-primary)]">
              Core Intelligence Signals (Executive Preview)
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[var(--highlight-bg)] text-[#F0511F] border border-[var(--highlight-border)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0511F] animate-pulse"></span>
              Live Telemetry
            </span>
          </div>
          <span className="text-xs font-medium text-[var(--text-secondary)] hidden sm:inline">
            4 modules verified
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Meta Ads */}
          <MetaAdsCard metaAds={report.metaAds} delay={0.1} />

          {/* Card 2: Google Ads */}
          <GoogleAdsCard googleAds={report.googleAds} delay={0.2} />

          {/* Card 3: PageSpeed */}
          <PageSpeedCard pageSpeed={report.pageSpeed} delay={0.3} />

          {/* Card 4: AI Short Summary */}
          <AISummaryCard aiSummary={report.aiSummary} delay={0.4} />
        </div>
      </div>

      {/* Unlock Full Report Lead Magnet Section */}
      <div id="unlock-section" className="print:hidden">
        <UnlockReportSection domain={report.domain} />
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-3 border-[#F0511F]/20 border-t-[#F0511F] rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-[var(--text-secondary)]">Loading audit results...</p>
          </div>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
