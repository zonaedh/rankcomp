"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Sparkles, Menu, X, ArrowRight, Activity } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[var(--nav-bg)] border-b border-[var(--border-theme)] transition-all duration-300 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A1715] to-[#E06859] flex items-center justify-center text-white shadow-md shadow-[#E06859]/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[var(--text-primary)] font-heading">
                  Rank<span className="text-[#FDA4AF]">Comp</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--highlight-bg)] text-[#FDA4AF] border border-[var(--highlight-border)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E06859] animate-pulse"></span>
                  LIVE SCAN
                </span>
              </div>
              <span className="text-[11px] text-[var(--text-subtle)] -mt-1 font-medium">
                Competitor Research Tool
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[#FDA4AF] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[#FDA4AF] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/demo"
              className="text-sm font-medium text-[#FDA4AF] hover:text-[#F28F82] flex items-center gap-1.5 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-[#E06859]" />
              Sample Reports
            </Link>
          </nav>

          {/* Action CTAs & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            <Link
              href="/#search-box"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#E06859] hover:bg-[#D4594A] rounded-xl shadow-md shadow-[#E06859]/20 hover:shadow-lg hover:shadow-[#E06859]/30 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <Search className="w-4 h-4 text-white" />
              <span>Scan Competitor Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button & Mobile Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/#search-box"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#E06859] rounded-lg"
            >
              Scan
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--text-secondary)] hover:text-[#FDA4AF] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--surface-card)] backdrop-blur-xl border-b border-[var(--border-theme)] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[var(--text-primary)] hover:bg-[var(--highlight-bg)]"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[var(--text-primary)] hover:bg-[var(--highlight-bg)]"
          >
            How It Works
          </Link>
          <Link
            href="/demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#FDA4AF] bg-[var(--highlight-bg)]"
          >
            Sample Reports Library
          </Link>
          <div className="pt-2">
            <Link
              href="/#search-box"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[#E06859] rounded-xl shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>Scan Competitor Free</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
