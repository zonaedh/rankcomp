"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Mail,
  Shield,
  Video,
  User,
  Phone,
  Clock,
  Award,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import UnlockSuccessModal from "@/components/shared/UnlockSuccessModal";

interface UnlockReportSectionProps {
  domain: string;
}

export default function UnlockReportSection({ domain }: UnlockReportSectionProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState("");

  const valueStack = [
    {
      title: "Full 18-Page In-Depth Competitor Dossier",
      value: "$197 Value",
      desc: "Complete Meta ad creative archive, Google Search keyword bidding strategies, SEO backlink profiles, and checkout friction drop-offs.",
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/20 border-emerald-500/40",
    },
    {
      title: "Private 30-Min 1:1 Live Strategy & Audit Consultation",
      value: "$297 Value",
      desc: "Private Zoom/Google Meet call with a 10+ Years Senior Full-Stack Marketing Manager to tear down this report and pinpoint where this competitor is bleeding revenue.",
      icon: Video,
      iconColor: "text-[#DA7735]",
      iconBg: "bg-[var(--highlight-bg)] border-[var(--highlight-border)]",
    },
    {
      title: "Custom 30-Day Customer Acquisition Attack Plan",
      value: "Actionable",
      desc: "Ready-to-launch ad hooks, target search keyword bids, and landing page angles designed specifically to win over their customers.",
      icon: Zap,
      iconColor: "text-[#E19456]",
      iconBg: "bg-[#E19456]/20 border-[#E19456]/40",
    },
    {
      title: "High-Converting Ad Copy & Creative Swipe File",
      value: "Included",
      desc: "Copy-paste headlines, hooks, and video angles battle-tested across $2M+ in profitable paid advertising spend.",
      icon: Award,
      iconColor: "text-[#E7AD72]",
      iconBg: "bg-[var(--highlight-bg)] border-[var(--highlight-border)]",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid business email address");
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
          phone: phone.trim() || undefined,
          domain,
          source: "unlock_report_consultation_offer",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Unable to process request");
      }

      // Trigger confetti celebration in Porsche warm amber & emerald
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#DA7735", "#E19456", "#E7AD72", "#10B981", "#FDF7EF"],
        });
      } catch {
        // safe fallback
      }

      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err?.message || "Failed to submit request. Please try again.");
    }
  };

  return (
    <>
      <motion.section
        id="unlock-section"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-br from-[#08080A] via-[#0E0E12] to-[#050507] rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-2xl overflow-hidden mt-12 border border-[var(--border-theme)]"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--highlight-bg)] rounded-full blur-3xl pointer-events-none opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Irresistible Value Offer & Authority */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top VIP Offer Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-xs font-bold text-[#E7AD72]">
              <Sparkles className="w-4 h-4 text-[#DA7735]" />
              <span>FREE 18-PAGE DOSSIER + 30-MIN 1:1 STRATEGY CALL ($497 VALUE)</span>
            </div>

            {/* Sales Pushy Headline */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight leading-tight">
                Ready to Outrank, Outbid & Steal Customers From{" "}
                <span className="text-[#E7AD72] underline decoration-[#DA7735]/50 underline-offset-4">
                  {domain}
                </span>
                ?
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed">
                Don’t just look at public numbers — turn this data into an unfair cash-flowing advantage. Claim the complete 18-page intelligence dossier <strong className="text-[#FDF7EF]">PLUS a complimentary 30-minute private 1:1 strategy consultation</strong> with a 10+ Years Senior Full-Stack Digital Marketing Manager.
              </p>
            </div>

            {/* Stacked Value Items */}
            <div className="space-y-3.5 pt-1">
              {valueStack.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[var(--border-theme)] transition-colors"
                  >
                    <div className={`w-7 h-7 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} shrink-0 mt-0.5 shadow-xs`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-[#FDF7EF] font-heading">
                          {item.title}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--highlight-bg)] text-[#E7AD72] border border-[var(--highlight-border)]">
                          {item.value}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Authority Proof Bar */}
            <div className="p-3.5 rounded-2xl bg-[var(--highlight-bg)] border border-[var(--highlight-border)] flex items-center gap-3 text-xs text-zinc-300">
              <div className="w-9 h-9 rounded-full bg-[#DA7735] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                10+
              </div>
              <div className="min-w-0">
                <span className="font-bold text-[#FDF7EF] block text-xs">
                  Consultation Hosted by Senior Full-Stack Marketing Strategist
                </span>
                <span className="text-[11px] text-[#E7AD72]">
                  10+ Years Experience • $2M+ in Paid Ad Spend • 100% Free (Zero Sales Pitch, Pure Actionable Moves)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Consultation & Dossier Claim Box */}
          <div className="lg:col-span-5">
            <div className="bg-[var(--surface-card)] rounded-3xl p-6 sm:p-8 text-[var(--text-primary)] shadow-2xl border border-[var(--border-theme)] relative overflow-hidden">
              {/* Top Accent Strip in Porsche Amber */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent" />

              <div className="text-center space-y-2 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[var(--highlight-bg)] text-[#DA7735] mx-auto flex items-center justify-center mb-2 border border-[var(--highlight-border)] shadow-sm">
                  <Video className="w-6 h-6 text-[#DA7735]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-[var(--text-primary)]">
                  Claim Your Free Dossier + 1:1 Call
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Where should we email your complete 18-page report and private calendar invite?
                </p>

                {/* Scarcity / Urgency Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#DA7735]/10 border border-[#DA7735]/30 text-[11px] font-bold text-[#E7AD72] mt-1">
                  <Clock className="w-3 h-3 text-[#DA7735]" />
                  <span>Only 4 Free Strategy Spots Available This Week</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Email Field */}
                <div>
                  <label htmlFor="lead-email" className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Work Email <span className="text-[#DA7735]">*</span>
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
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface-subtle)] border border-[var(--border-theme)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:outline-none focus:border-[#DA7735] focus:bg-[var(--surface)] transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="lead-name" className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Your Name (Optional)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]" />
                    <input
                      id="lead-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface-subtle)] border border-[var(--border-theme)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:outline-none focus:border-[#DA7735] focus:bg-[var(--surface)] transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp Field */}
                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    WhatsApp / Phone (Optional for instant calendar booking)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]" />
                    <input
                      id="lead-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface-subtle)] border border-[var(--border-theme)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:outline-none focus:border-[#DA7735] focus:bg-[var(--surface)] transition-all font-medium"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-medium text-rose-400 mt-1">
                    {error}
                  </p>
                )}

                {/* High-Converting CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#DA7735] hover:bg-[#CC602A] shadow-lg shadow-[#DA7735]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 cta-pulse mt-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Claim Free Dossier & Book 30-Min Call</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-3 text-[11px] text-[var(--text-secondary)] pt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    100% Free Forever
                  </span>
                  <span>•</span>
                  <span>No Pitch Guarantee</span>
                  <span>•</span>
                  <span>Instant PDF Delivery</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Success Modal with 1:1 Consultation Invite */}
      <UnlockSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        email={email || "your email"}
        domain={domain}
      />
    </>
  );
}
