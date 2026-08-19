"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  User,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { detectSocialPageUrl } from "@/lib/services/urlValidator";

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

  const socialInfo = detectSocialPageUrl(facebookUrlOrHandle) || {
    isSocialPage: true,
    platform: "facebook" as const,
    platformName: "Facebook",
    handle: facebookUrlOrHandle.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/.*$/, ""),
    normalizedUrl: facebookUrlOrHandle,
    adLibraryName: "Meta Ad Library",
    externalArchiveUrl: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(
      facebookUrlOrHandle
    )}`,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid business email address.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          domain: `${socialInfo.platformName.toLowerCase()}.com/${socialInfo.handle}`,
          platform: socialInfo.platform,
          source: `${socialInfo.platform}_page_detector`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit lead request.");
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl rounded-3xl bg-[var(--surface-card)] border border-[var(--border-theme)] shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Top glowing radiant bar in Porsche amber */}
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent" />

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
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-xs font-bold text-[#E7AD72]">
                    <Sparkles className="w-3.5 h-3.5 text-[#DA7735]" />
                    <span>Exclusive VIP Feature • {socialInfo.platformName} Intelligence</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--text-primary)] leading-snug">
                    Direct {socialInfo.platformName} Dossier:{" "}
                    <span className="text-[#E7AD72] underline decoration-[#DA7735]/40">{socialInfo.handle}</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    You entered a direct {socialInfo.platformName} link (<code>{socialInfo.platformName.toLowerCase()}.com/{socialInfo.handle}</code>). We are aggregating all active ad creatives, copywriting angles, and engagement telemetry into a bespoke dossier.
                  </p>
                </div>

                {/* Feature Highlights Card */}
                <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-2.5 text-xs text-[var(--text-primary)]">
                  <div className="font-bold text-[#DA7735] flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                    <Lock className="w-3.5 h-3.5 text-[#DA7735]" />
                    <span>Included in this Free 14-Page Dossier:</span>
                  </div>

                  <ul className="space-y-2 pt-1 text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Complete Active {socialInfo.platformName} Creatives:</strong> All active videos, carousels, and image ads currently running.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Copywriting Hooks & Angles:</strong> Breakdown of high-converting offers and discount strategies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>90-Day Attack Plan:</strong> 3-step action roadmap to out-convert their paid campaigns.</span>
                    </li>
                  </ul>
                </div>

                {/* Lead Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                      Work Email <span className="text-[#DA7735]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]" />
                      <input
                        type="email"
                        required
                        placeholder="founder@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] focus:border-[#DA7735] focus:outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                      Your Name or Company (Optional)
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] focus:border-[#DA7735] focus:outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] font-medium"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs font-medium text-rose-400">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#DA7735] hover:bg-[#CC602A] shadow-md shadow-[#DA7735]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Generate & Send Free {socialInfo.platformName} Dossier</span>
                        <Zap className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-[var(--text-subtle)] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      100% Confidential
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#DA7735]" />
                      Delivered in 5 Mins
                    </span>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold font-heading text-[var(--text-primary)]">
                    Audit Queued for Delivery!
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                    We are synthesizing all active ads and copywriting signals for{" "}
                    <strong className="text-[#E7AD72]">{socialInfo.platformName} profile ({socialInfo.handle})</strong>. Your tailored 14-page PDF will arrive at{" "}
                    <strong className="text-[var(--text-primary)]">{email}</strong> within 5 minutes.
                  </p>
                </div>

                <div className="pt-3">
                  <a
                    href={socialInfo.externalArchiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[var(--highlight-bg)] hover:bg-[var(--highlight-border)] border border-[var(--highlight-border)] text-[var(--text-primary)] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>View Official {socialInfo.adLibraryName}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#DA7735]" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
