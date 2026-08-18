"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, ArrowRight, Sparkles, Mail, Shield } from "lucide-react";
import confetti from "canvas-confetti";
import UnlockSuccessModal from "@/components/shared/UnlockSuccessModal";

interface UnlockReportSectionProps {
  domain: string;
}

export default function UnlockReportSection({ domain }: UnlockReportSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState("");

  const checklistItems = [
    {
      title: "Google Ads — full breakdown & creatives",
      desc: "Every active search ad copy, landing page destination, and estimated keyword bid.",
    },
    {
      title: "Complete SEO Audit",
      desc: "Top organic ranking keywords, backlinks profile, domain authority, and content gaps.",
    },
    {
      title: "Social Media Audit",
      desc: "Engagement velocity, top viral reels/posts, posting schedule, and influencer mentions.",
    },
    {
      title: "Full Business Inspection & Branding Gaps",
      desc: "Checkout friction points, customer sentiment breakdown, and pricing vulnerabilities.",
    },
    {
      title: "Strategic Growth Opportunities",
      desc: "Actionable 90-day step-by-step roadmap to outrank and outconvert this competitor.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid work email address");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), domain }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Unable to process request");
      }

      // Trigger confetti celebration in Coral
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#781E16", "#952117", "#F0511F", "#F58458", "#FEF4EE"],
        });
      } catch {
        // safe fallback
      }

      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err?.message || "Failed to submit lead request. Please try again.");
    }
  };

  return (
    <>
      <motion.section
        id="unlock-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-[#781E16] via-[#952117] to-[#410C09] rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden mt-12 border-2 border-[#F0511F]/40"
      >
        {/* Subtle mesh background circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F0511F]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F58458]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left / Info Side */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#FEF4EE]">
              <Sparkles className="w-4 h-4 text-[#F58458]" />
              <span>Full In-Depth Dossier (Free Instant Access)</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight leading-tight">
                Unlock the Full Competitor Report for{" "}
                <span className="text-[#F58458] underline decoration-[#F58458]/40 underline-offset-4">
                  {domain}
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#FDE6D7] mt-3 leading-relaxed">
                Take this executive snapshot and turn it into an unfair competitive advantage. Get complete ad copy archives, SEO keyword rankings, and deep tactical breakdown.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F0511F] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#FDE6D7]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right / Lead Capture Box */}
          <div className="lg:col-span-5">
            <div className="bg-[var(--surface-card)] rounded-3xl p-6 sm:p-8 text-[var(--text-primary)] shadow-2xl shadow-[#410C09]/50 border-2 border-[var(--border-accent)]">
              <div className="text-center space-y-2 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--highlight-bg)] text-[#F0511F] mx-auto flex items-center justify-center mb-3 border border-[var(--highlight-border)] shadow-sm">
                  <Lock className="w-6 h-6 text-[#F0511F]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-[var(--text-primary)]">
                  Receive the Complete PDF
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Where should we email your comprehensive 18-page dossier?
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="lead-email" className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                    Your Business Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]" />
                    <input
                      id="lead-email"
                      type="email"
                      required
                      placeholder="founder@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-[var(--surface-subtle)] border-2 border-[var(--border-theme)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:outline-none focus:border-[#F0511F] focus:bg-[var(--surface)] transition-all font-medium"
                    />
                  </div>
                  {error && (
                    <p className="text-xs font-medium text-rose-500 mt-1.5">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#781E16] to-[#F0511F] hover:from-[#410C09] hover:to-[#E23814] shadow-lg shadow-[#F0511F]/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Get Full Report — Free</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-[var(--text-secondary)] pt-1">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 text-[#F0511F]" />
                    Instant delivery
                  </span>
                  <span>•</span>
                  <span>100% Free forever</span>
                  <span>•</span>
                  <span>No credit card</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Success Modal */}
      <UnlockSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        email={email || "your email"}
        domain={domain}
      />
    </>
  );
}
