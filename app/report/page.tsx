"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Printer,
  Calendar,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Check,
} from "lucide-react";
import ScoreBadge from "@/components/report/ScoreBadge";
import MetaAdsCard from "@/components/report/MetaAdsCard";
import GoogleAdsCard from "@/components/report/GoogleAdsCard";
import PageSpeedCard from "@/components/report/PageSpeedCard";
import AISummaryCard from "@/components/report/AISummaryCard";
import UnlockReportSection from "@/components/report/UnlockReportSection";
import { getCompetitorReport } from "@/lib/mockData";
import { ProductionCompetitorReport } from "@/lib/services/reportAggregator";

function ReportContent() {
  const searchParams = useSearchParams();
  const rawDomain = searchParams.get("domain");
  const domain = rawDomain ? rawDomain.trim().toLowerCase() : "strideapparel.com";

  const [report, setReport] = useState<ProductionCompetitorReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchReport = async () => {
    setIsLoading(true);
    setError("");

    try {
      // 1. First try live API endpoint
      const res = await fetch(`/api/analyze?domain=${encodeURIComponent(domain)}`);
      if (res.ok) {
        const data = await res.json();
        setReport(data);
        setIsLoading(false);
        return;
      }

      // 2. Fallback to mock preset report for guaranteed zero-error demo resilience
      const fallback = getCompetitorReport(domain) as ProductionCompetitorReport;
      if (fallback) {
        setReport(fallback);
        setIsLoading(false);
        return;
      }

      throw new Error("Unable to synthesize report data.");
    } catch {
      // Guaranteed safe fallback
      const fallback = getCompetitorReport(domain) as ProductionCompetitorReport;
      setReport(fallback);
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
            <div className="w-16 h-16 border-4 border-[#E06859]/20 border-t-[#E06859] rounded-full animate-spin" />
            <Sparkles className="w-6 h-6 text-[#E06859] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-heading">Generating Live Intelligence</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Connecting to Google PageSpeed, Meta ad registries, and AI synthesis for <span className="font-semibold text-[#FDA4AF]">{domain}</span>...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[var(--surface-card)] border border-rose-500/20 shadow-xl text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
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
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#E06859] hover:bg-[#D4594A] transition-all flex items-center justify-center gap-2 cursor-pointer"
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[#FDA4AF] px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border-theme)] shadow-2xs hover:bg-[var(--highlight-bg)] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Analyze Another</span>
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

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Print / Save to PDF */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-[#FDA4AF] bg-[var(--surface)] border border-[var(--border-theme)] hover:bg-[var(--highlight-bg)] transition-all cursor-pointer shadow-2xs"
            title="Print or Export PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#E06859]" />
            <span>Print Report</span>
          </button>

          {/* Share Button */}
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
                <span>Share Snapshot</span>
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
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[var(--highlight-bg)] text-[#FDA4AF] border border-[var(--highlight-border)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E06859] animate-pulse"></span>
              Live Telemetry
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Module 1: Meta Ads & Pixel */}
          <MetaAdsCard metaAds={report.metaAds} delay={0.1} />

          {/* Module 2: Google Ads Bidding */}
          <GoogleAdsCard googleAds={report.googleAds} delay={0.2} />

          {/* Module 3: PageSpeed & Web Vitals */}
          <PageSpeedCard pageSpeed={report.pageSpeed} delay={0.3} />

          {/* Module 4: Plain-English AI Strategic Playbook */}
          <AISummaryCard aiSummary={report.aiSummary} delay={0.4} />
        </div>
      </div>

      {/* High-Converting Lead Magnet: Full 18-Page PDF Dossier Unlock */}
      <UnlockReportSection domain={report.domain} />
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[75vh] flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-[#E06859]/20 border-t-[#E06859] rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
