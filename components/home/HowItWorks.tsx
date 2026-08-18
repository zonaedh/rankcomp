"use client";

import { motion } from "framer-motion";
import { Search, Cpu, FileCheck2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "1. Enter Competitor Website",
      desc: "Paste any competitor website link (like daraz.com.bd) or their Facebook page into the search box.",
      icon: Search,
      highlight: "Takes 3 seconds",
    },
    {
      step: "02",
      title: "2. Automatic Live Check",
      desc: "Our system automatically checks their live Facebook ads, Google keywords, and website loading speed.",
      icon: Cpu,
      highlight: "100% Automated",
    },
    {
      step: "03",
      title: "3. Get Your Report & AI Plan",
      desc: "See their active ads, website speed score, and simple AI tips to get more customers for your own business.",
      icon: FileCheck2,
      highlight: "Instant Free Report",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative overflow-hidden bg-[var(--bg-base)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F0511F]">
            Simple & Fast
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
            How It Works in 3 Easy Steps
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            No setup needed and no coding required. Just enter a website and get your full competitor report in seconds.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="bg-[var(--surface-card)] rounded-2xl p-7 border border-[var(--border-theme)] shadow-xs relative flex flex-col justify-between hover:shadow-lg hover:border-[#F0511F]/50 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-heading text-[#F0511F]/30">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[var(--highlight-bg)] text-[#F0511F] flex items-center justify-center border border-[var(--highlight-border)]">
                      <Icon className="w-6 h-6 text-[#F0511F]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[var(--border-theme)]">
                  <span className="text-[11px] font-semibold text-[#F0511F] bg-[var(--highlight-bg)] px-2.5 py-1 rounded-md border border-[var(--highlight-border)]">
                    {item.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Strip */}
        <div className="mt-14 text-center">
          <Link
            href="/#search-box"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#781E16] to-[#F0511F] hover:from-[#410C09] hover:to-[#E23814] shadow-md shadow-[#F0511F]/20 transition-all"
          >
            <span>Scan a Competitor Now — Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
