"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { formatDomain } from "@/lib/utils";
import { isFacebookPageUrl } from "@/lib/services/urlValidator";
import FacebookPageLeadModal from "@/components/shared/FacebookPageLeadModal";

export default function HeroSection() {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState("");
  const [isFbModalOpen, setIsFbModalOpen] = useState(false);
  const [fbTargetUrl, setFbTargetUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) {
      setError("Please enter a competitor website or social profile link (Facebook, TikTok, X, LinkedIn, Pinterest)");
      return;
    }

    // Auto-detect Social Page Links (Facebook, TikTok, X, Pinterest, LinkedIn) and trigger Exclusive VIP Lead Magnet
    if (isFacebookPageUrl(inputUrl)) {
      setFbTargetUrl(inputUrl.trim());
      setIsFbModalOpen(true);
      return;
    }

    const clean = formatDomain(inputUrl);
    router.push(`/analyze?domain=${encodeURIComponent(clean)}`);
  };

  const samplePresets = [
    { name: "daraz.com.bd", label: "Daraz" },
    { name: "pickaboo.com", label: "Pickaboo" },
    { name: "gymshark.com", label: "Gymshark" },
    { name: "strideapparel.com", label: "Stride Apparel" },
  ];

  return (
    <>
      <section className="relative pt-14 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300">
        {/* 1. Modern Grid Background Layer with Smooth Radial Vignette Mask */}
        <div className="absolute inset-0 modern-grid modern-grid-mask pointer-events-none z-0" />

        {/* 2. Top Subtle Accent Glow Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent pointer-events-none" />

        {/* 3. Dual Ambient Radial Glow Orbs in Porsche Amber */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[440px] bg-gradient-to-br from-[var(--highlight-bg)] via-white/[0.01] to-transparent rounded-full blur-3xl pointer-events-none z-0 opacity-80" />
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[var(--highlight-bg)] rounded-full blur-2xl pointer-events-none z-0 opacity-50" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Top Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-accent)] shadow-xs text-xs font-semibold text-[var(--text-primary)]"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DA7735] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DA7735]"></span>
            </span>
            <span>Free Competitor Spy Tool</span>
            <span className="text-[var(--border-accent)]">•</span>
            <span className="text-[#E7AD72] font-bold">100% Free Live Check</span>
          </motion.div>

          {/* Hero Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight leading-[1.14]">
              See Your Competitors’ Ads, Speed & Strategy{" "}
              <span className="gradient-text block sm:inline">in Seconds.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed font-sans">
              Find out what ads your competitors run on Facebook, TikTok, Google & LinkedIn, check how fast their website loads, and get simple AI tips to win more customers.
            </p>
          </motion.div>

          {/* Primary Search Input Box */}
          <motion.div
            id="search-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <form
              onSubmit={handleSubmit}
              className="p-2 sm:p-2.5 rounded-2xl bg-[var(--surface-card)]/90 backdrop-blur-2xl border border-[var(--border-theme)] focus-within:border-[var(--border-hover)] shadow-xl shadow-black/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-subtle)]" />
                  <input
                    type="text"
                    placeholder="Enter website or social link (e.g. daraz.com.bd, tiktok.com/@brand, x.com/brand)..."
                    value={inputUrl}
                    onChange={(e) => {
                      setInputUrl(e.target.value);
                      setError("");
                    }}
                    className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-transparent text-sm sm:text-base text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#DA7735] hover:bg-[#CC602A] shadow-md shadow-[#DA7735]/20 hover:shadow-lg hover:shadow-[#DA7735]/35 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer cta-pulse"
                >
                  <span>Scan Competitor Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {error && (
              <p className="text-xs font-semibold text-rose-400 mt-2 text-left pl-3">
                {error}
              </p>
            )}

            {/* Quick Preset Buttons & Instant Demo Link */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-[var(--text-secondary)]">
              <span className="font-medium">Or try an example:</span>
              {samplePresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setInputUrl(preset.name);
                    router.push(`/analyze?domain=${encodeURIComponent(preset.name)}`);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border-theme)] text-[var(--text-primary)] font-semibold hover:border-[var(--border-hover)] hover:bg-[var(--highlight-bg)] transition-all cursor-pointer shadow-2xs"
                >
                  {preset.name}
                </button>
              ))}

              <span className="text-[var(--border-accent)]">•</span>

              <Link
                href="/demo"
                className="font-bold text-[#DA7735] hover:text-[#E7AD72] flex items-center gap-1 underline underline-offset-2 transition-colors"
              >
                <span>View Sample Reports</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

          {/* Feature Badges Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[var(--text-secondary)] font-medium"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#DA7735]" />
              <span>100% Safe & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#DA7735]" />
              <span>Instant Live Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#DA7735]" />
              <span>Facebook & Google Ad Check</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facebook Page Exclusive Lead Magnet Modal */}
      <FacebookPageLeadModal
        isOpen={isFbModalOpen}
        onClose={() => setIsFbModalOpen(false)}
        facebookUrlOrHandle={fbTargetUrl}
      />
    </>
  );
}
