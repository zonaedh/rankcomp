import Link from "next/link";
import { Sparkles, Zap, ExternalLink, Heart, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0E] text-zinc-300 border-t border-[var(--border-theme)] mt-auto overflow-hidden print:hidden transition-colors duration-300">
      {/* Top radiant glow line in soft rose */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent pointer-events-none" />

      {/* Ambient background glow orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--highlight-bg)] rounded-full blur-3xl pointer-events-none opacity-30" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A1715] to-[#E06859] flex items-center justify-center text-white shadow-lg shadow-[#E06859]/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white font-heading">
                  Rank<span className="text-[#FDA4AF]">Comp</span>
                </span>
                <span className="text-[11px] text-zinc-400 -mt-1 font-medium">
                  Competitor Research Tool
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-zinc-400 max-w-sm">
              Instant competitor research, Facebook & Google ads spy, and simple growth tips for modern businesses.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#FDA4AF]">
              <span className="w-2 h-2 rounded-full bg-[#E06859] animate-pulse"></span>
              Live Competitor Checks
            </div>
          </div>

          {/* Features */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E06859]"></span>
              Features
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/demo" className="text-zinc-400 hover:text-[#FDA4AF] transition-colors flex items-center gap-1.5">
                  <span>Facebook & Instagram Ads</span>
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-zinc-400 hover:text-[#FDA4AF] transition-colors flex items-center gap-1.5">
                  <span>Google Search Ads</span>
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-zinc-400 hover:text-[#FDA4AF] transition-colors flex items-center gap-1.5">
                  <span>Website Speed Test</span>
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-zinc-400 hover:text-[#FDA4AF] transition-colors flex items-center gap-1.5">
                  <span>Smart AI Action Plan</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Sample Reports */}
          <div className="md:col-span-2">
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E06859]"></span>
              Sample Reports
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/report?domain=daraz.com.bd" className="text-zinc-400 hover:text-[#FDA4AF] transition-colors">
                  Daraz
                </Link>
              </li>
              <li>
                <Link href="/report?domain=pickaboo.com" className="text-zinc-400 hover:text-[#FDA4AF] transition-colors">
                  Pickaboo
                </Link>
              </li>
              <li>
                <Link href="/report?domain=gymshark.com" className="text-zinc-400 hover:text-[#FDA4AF] transition-colors">
                  Gymshark
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/demo" className="font-bold text-[#FDA4AF] hover:text-[#F28F82] transition-colors flex items-center gap-1">
                  <span>See All Samples</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Custom Tool Box */}
          <div className="md:col-span-3 bg-white/[0.03] p-6 rounded-2xl border border-white/10 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FDA4AF] uppercase tracking-wide">
              <Zap className="w-4 h-4 text-[#E06859]" />
              Lead Generation Tool
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Built to turn website visitors into high-paying customer leads for digital agencies and businesses.
            </p>
            <div className="text-xs text-white font-semibold pt-1">
              Want a custom tool built for your business?
            </div>
            <a
              href="https://zonaedhossain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FDA4AF] hover:text-[#F28F82] transition-colors"
            >
              <span>Learn more at zonaedhossain.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-10 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <div>
            © {new Date().getFullYear()} RankComp by <span className="font-bold text-white">Zonaed Hossain</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#FDA4AF] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FDA4AF] transition-colors">
              Terms of Service
            </Link>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-[#E06859] fill-[#E06859]" /> for growing businesses
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
