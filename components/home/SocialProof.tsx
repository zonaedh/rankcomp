"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function SocialProof() {
  const stats = [
    { label: "Websites Checked", value: "14,800+" },
    { label: "Live Ads Tracked", value: "240,000+" },
    { label: "Average Check Time", value: "7.8s" },
    { label: "User Rating", value: "4.9 / 5.0" },
  ];

  const brandLogos = [
    "NEXUSTECH", "STRIDE COMMERCE", "LUMINA DIGITAL", "AURA LABS", "VELOCITY MEDIA", "VORTEX RETAIL"
  ];

  const testimonials = [
    {
      quote: "RankComp showed us in 10 seconds that our top competitor had zero Google Search ads running on their main keywords. We started running ads on those search words and tripled our sales.",
      author: "Marcus Vance",
      role: "Growth Lead",
      company: "HyperScale",
      rating: 5,
    },
    {
      quote: "The combination of Facebook Ads and Website Speed is amazing for client meetings. We show this live report to potential clients, and they immediately trust us.",
      author: "Elena Rostova",
      role: "Agency Founder",
      company: "OmniGrowth Media",
      rating: 5,
    },
    {
      quote: "The simple AI summary showed us that our competitor's website was very slow on mobile phones. We improved our own speed and got way more buyers.",
      author: "David Chen",
      role: "Marketing Manager",
      company: "Aura Commerce",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--surface-subtle)] border-b border-[var(--border-theme)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Metric Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-theme)] shadow-xs">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-[#DA7735]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Dummy Brand Logos Strip */}
        <div className="space-y-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-subtle)]">
            Trusted by business owners, agency teams & marketers worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
            {brandLogos.map((logo, idx) => (
              <span
                key={idx}
                className="font-extrabold font-heading text-sm sm:text-base tracking-widest text-[var(--text-secondary)]"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-7 border border-[var(--border-theme)] flex flex-col justify-between hover:border-[var(--border-hover)] hover:shadow-xl hover:shadow-black/50 transition-all shadow-2xs"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[var(--border-theme)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">
                    {item.author}
                  </div>
                  <div className="text-[11px] text-[var(--text-subtle)]">
                    {item.role}
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[var(--highlight-bg)] text-[#E7AD72] border border-[var(--highlight-border)]">
                  {item.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
