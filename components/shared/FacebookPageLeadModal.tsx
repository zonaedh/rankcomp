"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Lock,
  Mail,
  User,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  X,
} from "lucide-react";

interface FacebookPageLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  facebookUrlOrHandle: string;
}

export default function FacebookPageLeadModal({
  isOpen,
  onClose,
  facebookUrlOrHandle,
}: FacebookPageLeadModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const pageHandle = facebookUrlOrHandle
    .replace(/^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com|fb\.me)\//i, "")
    .replace(/\?.*$/, "")
    .replace(/\/.*$/, "")
    .trim() || "Facebook Page";

  const adLibraryUrl = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=${encodeURIComponent(
    pageHandle
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid work email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          domain: `facebook.com/${pageHandle}`,
          competitorName: pageHandle,
          source: "facebook_page_exclusive_audit",
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setError("Failed to schedule report. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-xl rounded-3xl bg-[var(--surface-card)] border border-[var(--border-accent)] shadow-2xl shadow-[#F0511F]/20 overflow-hidden z-10 my-8"
        >
          {/* Top glowing radiant bar */}
          <div className="h-2 w-full bg-gradient-to-r from-[#781E16] via-[#F0511F] to-[#FBCAAD]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 space-y-6">
            {!isSuccess ? (
              <>
                {/* Header with VIP Badge */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-xs font-bold text-[#F0511F]">
                    <Sparkles className="w-3.5 h-3.5 text-[#F0511F]" />
                    <span>Exclusive VIP Feature • Social Page Intelligence</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--text-primary)] leading-snug">
                    Direct Facebook Page Dossier:{" "}
                    <span className="text-[#F0511F] underline decoration-[var(--border-accent)]">{pageHandle}</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    You entered a direct social page link (<code>facebook.com/{pageHandle}</code>). Direct Facebook Page audits require dedicated deep aggregation to extract all live ad creatives, copywriting angles, and audience engagement telemetry.
                  </p>
                </div>

                {/* Feature Highlights Card */}
                <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-2.5 text-xs text-[var(--text-primary)]">
                  <div className="font-bold text-[#F0511F] flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                    <Lock className="w-3.5 h-3.5 text-[#F0511F]" />
                    <span>Included in this Free 14-Page Dossier:</span>
                  </div>

                  <ul className="space-y-2 pt-1 text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0511F] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[var(--text-primary)]">Full Meta Ad Creative Archive:</strong> Every active image, carousel, and video hook currently scaling on Facebook & Instagram.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0511F] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[var(--text-primary)]">Audience Engagement & Spend:</strong> Estimated monthly paid budget, posting velocity, and conversion funnel strategy.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F0511F] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[var(--text-primary)]">AI Copywriting Counter-Playbook:</strong> Proven copywriting formulas to out-convert this competitor.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[var(--text-primary)]">
                      Work Email <span className="text-[#F0511F]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]" />
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] focus:border-[#F0511F] focus:outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] font-medium"
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] focus:border-[#F0511F] focus:outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] font-medium"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs font-semibold text-rose-500 pl-1">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#781E16] to-[#F0511F] hover:from-[#410C09] hover:to-[#E23814] shadow-md shadow-[#F0511F]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
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

                  <div className="flex items-center justify-center gap-4 text-[11px] text-[var(--text-secondary)] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F0511F]" />
                      <span>100% Confidential</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#F0511F]" />
                      <span>Instant PDF Delivery</span>
                    </span>
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[var(--highlight-bg)] border border-[var(--highlight-border)] flex items-center justify-center mx-auto text-[#F0511F] shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold font-heading text-[var(--text-primary)]">
                    Dossier Generation In Progress!
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                    We are synthesizing the full social intelligence audit for{" "}
                    <strong className="text-[#F0511F]">facebook.com/{pageHandle}</strong>. Your tailored 14-page PDF will arrive at{" "}
                    <strong className="text-[var(--text-primary)]">{email}</strong> in a few minutes.
                  </p>
                </div>

                <div className="pt-3 space-y-2.5">
                  <a
                    href={adLibraryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[var(--highlight-bg)] hover:bg-[#F0511F]/20 border border-[var(--highlight-border)] text-[var(--text-primary)] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Open {pageHandle} in Meta Ad Library Right Now</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#F0511F]" />
                  </a>

                  <button
                    onClick={onClose}
                    className="w-full py-2.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    Done / Return to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
