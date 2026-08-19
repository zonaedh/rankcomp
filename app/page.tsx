import HeroSection from "@/components/home/HeroSection";
import FeatureCards from "@/components/home/FeatureCards";
import HowItWorks from "@/components/home/HowItWorks";
import SocialProof from "@/components/home/SocialProof";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-base)] transition-colors duration-300">
      {/* 1. Hero Section with Competitor Domain Input */}
      <HeroSection />

      {/* 2. Feature Highlight Cards (Meta Ads, Google Ads, PageSpeed, AI Summary) */}
      <FeatureCards />

      {/* 3. How It Works 3-Step Section */}
      <HowItWorks />

      {/* 4. Social Proof & Testimonials Strip */}
      <SocialProof />

      {/* 5. Bottom Final CTA Banner — Compact, Squeezed & Well-Fitted */}
      <section className="py-10 sm:py-14 md:py-16 bg-[var(--bg-base)] relative overflow-hidden transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl sm:rounded-3xl bg-[var(--surface-card)] border border-[var(--border-theme)] p-6 sm:p-8 md:p-10 text-center space-y-4 sm:space-y-5 overflow-hidden shadow-xl transition-all duration-300">
            {/* Top Subtle Gradient Glow Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-xl h-[1px] bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent pointer-events-none" />

            {/* Soft Ambient Radial Glow Behind Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[220px] bg-gradient-to-br from-[var(--highlight-bg)] via-white/[0.01] to-transparent rounded-full blur-2xl pointer-events-none opacity-50" />

            {/* Top Pill Badge */}
            <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-[11px] sm:text-xs font-semibold text-[#E7AD72]">
              <Sparkles className="w-3 h-3 text-[#DA7735]" />
              <span>Ready in 8 seconds • 100% Free Live Check</span>
            </div>

            {/* Compact Headline */}
            <div className="relative z-10 space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading tracking-tight leading-tight text-[var(--text-primary)]">
                Stop Guessing.{" "}
                <span className="gradient-text block sm:inline">
                  Win More Customers Today.
                </span>
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
                Check any competitor for free. See where they run ads, what keywords they target, and where they are losing customers.
              </p>
            </div>

            {/* Compact Action Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <Link
                href="/#search-box"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#DA7735] hover:bg-[#CC602A] shadow-md shadow-[#DA7735]/20 hover:shadow-lg hover:shadow-[#DA7735]/35 transition-all flex items-center justify-center gap-2 group cursor-pointer cta-pulse"
              >
                <span>Check Your First Competitor Free</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/demo"
                className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-[var(--text-primary)] bg-[var(--surface)] hover:bg-[var(--highlight-bg)] border border-[var(--border-theme)] hover:border-[var(--highlight-border)] transition-all text-center"
              >
                See Sample Reports
              </Link>
            </div>

            {/* Compact Trust Marks */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[var(--text-subtle)] pt-1 font-medium">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DA7735]" />
                <span>No sign-up or install needed</span>
              </div>
              <span className="hidden sm:inline text-[var(--border-theme)]">•</span>
              <div className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#DA7735]" />
                <span>100% Safe & Private</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
