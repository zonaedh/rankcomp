import Link from "next/link";
import { Sparkles, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[var(--bg-base)]">
      <div className="max-w-md w-full text-center space-y-6 bg-[var(--surface-card)] p-8 sm:p-10 rounded-3xl border border-[var(--border-theme)] shadow-xl">
        {/* Top 404 badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-xs font-bold text-[#FDA4AF]">
          <Sparkles className="w-3.5 h-3.5 text-[#E06859]" />
          <span>Error 404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            The intelligence page or competitor report you are looking for has been moved or doesn’t exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#E06859] hover:bg-[#D4594A] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#E06859]/20"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/demo"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[#FDA4AF] bg-[var(--surface)] border border-[var(--border-theme)] hover:bg-[var(--highlight-bg)] transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Sample Audits</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
