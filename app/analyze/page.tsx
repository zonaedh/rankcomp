"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, AlertTriangle, RefreshCw, ArrowLeft, Sparkles, ShieldCheck, Lock, Mail, User, CheckCircle2, ExternalLink, ArrowRight } from "lucide-react";
import ProgressStep, { StepState } from "@/components/shared/ProgressStep";
import { formatDomain } from "@/lib/utils";
import { isFacebookPageUrl, extractFacebookPageHandle } from "@/lib/services/urlValidator";

function AnalyzeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawDomain = searchParams.get("domain") || "strideapparel.com";
  const isFbPage = isFacebookPageUrl(rawDomain);
  const fbPageHandle = isFbPage ? extractFacebookPageHandle(rawDomain) : "";
  const domain = isFbPage ? `facebook.com/${fbPageHandle}` : formatDomain(rawDomain);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Facebook Lead Form State if FB Page is detected
  const [fbEmail, setFbEmail] = useState("");
  const [fbName, setFbName] = useState("");
  const [isFbSubmitting, setIsFbSubmitting] = useState(false);
  const [isFbSuccess, setIsFbSuccess] = useState(false);
  const [fbError, setFbError] = useState("");

  const steps = [
    {
      label: "Inspecting Meta Ads & Pixel...",
      sublabel: "Querying active Facebook & Instagram ad creatives and tracking scripts",
    },
    {
      label: "Checking Google Ads conversion tags...",
      sublabel: "Detecting Search Network tags, GTM, and bidding keywords",
    },
    {
      label: "Executing Google PageSpeed audit...",
      sublabel: "Measuring Lighthouse Core Web Vitals (FCP, LCP, CLS, Speed Index)",
    },
    {
      label: "Synthesizing AI executive strategy...",
      sublabel: "Synthesizing competitive vulnerabilities & strategic counter-play",
    },
  ];

  const handleFbSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbEmail.trim() || !fbEmail.includes("@")) {
      setFbError("Please enter a valid work email address");
      return;
    }
    setIsFbSubmitting(true);
    setFbError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fbEmail.trim(),
          name: fbName.trim() || undefined,
          domain: `facebook.com/${fbPageHandle}`,
          competitorName: fbPageHandle,
          source: "facebook_page_exclusive_audit",
        }),
      });
      if (res.ok) {
        setIsFbSuccess(true);
      } else {
        setFbError("Failed to schedule report. Please try again.");
      }
    } catch {
      setFbError("Network error. Please check your connection.");
    } finally {
      setIsFbSubmitting(false);
    }
  };

  const startAnalysis = async () => {
    if (isFbPage) return;

    setErrorMsg(null);
    setCurrentStepIndex(0);
    setProgress(15);
    setIsCompleted(false);

    // Progress cadence while API executes
    const t1 = setTimeout(() => {
      setCurrentStepIndex(1);
      setProgress(40);
    }, 1800);

    const t2 = setTimeout(() => {
      setCurrentStepIndex(2);
      setProgress(68);
    }, 3800);

    const t3 = setTimeout(() => {
      setCurrentStepIndex(3);
      setProgress(88);
    }, 5800);

    try {
      const res = await fetch(`/api/analyze?domain=${encodeURIComponent(domain)}`);
      const data = await res.json();

      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);

      if (!res.ok || data.error) {
        throw new Error(data.error || "Unable to inspect this domain. Please verify that the website is online.");
      }

      // Store in sessionStorage for fast report rendering
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(`rankcomp_report_${domain}`, JSON.stringify(data));
        } catch {
          // ignore storage quota error
        }
      }

      setCurrentStepIndex(4);
      setProgress(100);
      setIsCompleted(true);

      setTimeout(() => {
        router.push(`/report?domain=${encodeURIComponent(domain)}`);
      }, 700);
    } catch (err: any) {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setErrorMsg(err?.message || "An unexpected error occurred while analyzing this domain.");
    }
  };

  useEffect(() => {
    if (!isFbPage) {
      startAnalysis();
    }
  }, [domain, isFbPage]);

  const getStepState = (idx: number): StepState => {
    if (errorMsg) return idx === currentStepIndex ? "pending" : idx < currentStepIndex ? "completed" : "pending";
    if (idx < currentStepIndex) return "completed";
    if (idx === currentStepIndex) return "active";
    return "pending";
  };

  const fbAdLibraryUrl = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=${encodeURIComponent(
    fbPageHandle
  )}`;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[var(--bg-base)] transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--highlight-bg)] to-transparent rounded-full blur-3xl pointer-events-none opacity-50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-[var(--surface-card)] rounded-3xl p-6 sm:p-10 shadow-xl border border-[var(--border-theme)] relative z-10"
      >
        {isFbPage ? (
          /* Facebook Page Exclusive Lead Capture State */
          <div className="space-y-6">
            {!isFbSuccess ? (
              <>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-xs font-bold text-[#FDA4AF]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E06859]" />
                    <span>Exclusive VIP Feature • Social Page Intelligence</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--text-primary)]">
                    Direct Facebook Page Dossier:{" "}
                    <span className="text-[#FDA4AF]">{fbPageHandle}</span>
                  </h1>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
                    You entered a direct social page link (<code>facebook.com/{fbPageHandle}</code>). Direct Facebook Page audits require dedicated deep aggregation to extract all live ad creatives, copywriting angles, and audience engagement telemetry.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-2.5 text-xs text-[var(--text-primary)]">
                  <div className="font-bold text-[#E06859] flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                    <Lock className="w-3.5 h-3.5 text-[#E06859]" />
                    <span>Included in this Free 14-Page Dossier:</span>
                  </div>

                  <ul className="space-y-2 pt-1 text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[var(--text-primary)]">Full Meta Ad Creative Archive:</strong> Every active image, carousel, and video hook currently scaling.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[var(--text-primary)]">Audience Engagement & Spend:</strong> Estimated monthly paid budget, posting velocity, and conversion funnel strategy.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[var(--text-primary)]">AI Copywriting Counter-Playbook:</strong> Proven copywriting formulas to out-convert this competitor.
                      </span>
                    </li>
                  </ul>
                </div>

                <form onSubmit={handleFbSubmit} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[var(--text-primary)]">
                      Work Email <span className="text-[#E06859]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]" />
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={fbEmail}
                        onChange={(e) => {
                          setFbEmail(e.target.value);
                          setFbError("");
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] focus:border-[#E06859] focus:outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[var(--text-primary)]">
                      Your Name / Brand (Optional)
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]" />
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        value={fbName}
                        onChange={(e) => setFbName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] focus:border-[#E06859] focus:outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] font-medium"
                      />
                    </div>
                  </div>

                  {fbError && (
                    <p className="text-xs font-semibold text-rose-400 pl-1">{fbError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isFbSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#E06859] hover:bg-[#D4594A] shadow-md shadow-[#E06859]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isFbSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Aggregating Social Dossier...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate & Email Free Facebook Dossier</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <Link
                      href="/"
                      className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[#FDA4AF] transition-colors"
                    >
                      ← Analyze a standard website domain instead
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold font-heading text-[var(--text-primary)]">
                    Dossier Generation In Progress!
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                    We are synthesizing the full social intelligence audit for{" "}
                    <strong className="text-[#FDA4AF]">facebook.com/{fbPageHandle}</strong>. Your tailored 14-page PDF will arrive at{" "}
                    <strong className="text-[var(--text-primary)]">{fbEmail}</strong> in a few minutes.
                  </p>
                </div>

                <div className="pt-3 space-y-2.5">
                  <a
                    href={fbAdLibraryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[var(--highlight-bg)] hover:bg-[var(--highlight-border)] border border-[var(--highlight-border)] text-[var(--text-primary)] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Open {fbPageHandle} in Meta Ad Library Right Now</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#E06859]" />
                  </a>

                  <Link
                    href="/"
                    className="inline-block w-full py-2.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    Done / Return to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Standard Domain Live Scan Progress */
          <>
            {/* Top Header */}
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-xs font-bold text-[#FDA4AF]">
                <Globe className="w-3.5 h-3.5 text-[#E06859]" />
                <span>Target: {domain}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
                {errorMsg ? "Audit Interrupted" : isCompleted ? "Audit Complete!" : "Live Competitor Scan"}
              </h1>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                {errorMsg
                  ? "We encountered an issue connecting to this target website."
                  : isCompleted
                  ? "All intelligence signals extracted successfully. Redirecting to your report..."
                  : "Querying live PageSpeed benchmarks, Meta ad libraries, and conversion telemetry..."}
              </p>
            </div>

            {/* Error Notification View */}
            {errorMsg ? (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-400">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Scan Error</span>
                  </div>
                  <p className="text-rose-300 leading-relaxed">{errorMsg}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={startAnalysis}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#E06859] hover:bg-[#D4594A] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry Scan</span>
                  </button>

                  <Link
                    href="/"
                    className="w-full sm:w-auto py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[#FDA4AF] bg-[var(--surface)] border border-[var(--border-theme)] transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Analyze Different Domain</span>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Progress Bar */}
                <div className="space-y-2 mb-8">
                  <div className="flex items-center justify-between text-xs font-bold text-[#FDA4AF]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E06859] animate-pulse" />
                      <span>Real-Time Diagnostic Pipeline</span>
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[var(--surface-subtle)] rounded-full overflow-hidden border border-[var(--border-theme)] p-0.5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#2A1715] to-[#E06859] rounded-full"
                      initial={{ width: "15%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Sequenced Steps Card */}
                <div className="space-y-2 bg-[var(--surface-subtle)] p-3 sm:p-4 rounded-2xl border border-[var(--border-theme)] divide-y divide-[var(--border-theme)]">
                  {steps.map((step, idx) => (
                    <ProgressStep
                      key={idx}
                      stepNumber={idx + 1}
                      label={step.label}
                      sublabel={step.sublabel}
                      state={getStepState(idx)}
                    />
                  ))}
                </div>

                {/* Footer Trust Signal */}
                <div className="mt-8 pt-6 border-t border-[var(--border-theme)] flex items-center justify-center gap-2 text-center text-xs text-[var(--text-subtle)]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Direct non-intrusive public telemetry inspection</span>
                </div>
              </>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-3 border-[#E06859]/20 border-t-[#E06859] rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-[var(--text-secondary)]">Initializing scanner...</p>
          </div>
        </div>
      }
    >
      <AnalyzeContent />
    </Suspense>
  );
}
