import Link from "next/link";
import { Sparkles, ArrowLeft, Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-[#F3E6DF] shadow-xl">
        {/* Top 404 badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF4EE] border border-[#FBCAAD] text-xs font-bold text-[#BB2713]">
          <Sparkles className="w-3.5 h-3.5 text-[#F0511F]" />
          <span>Error 404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1E1715] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#5C4A45] leading-relaxed">
            The intelligence page or competitor report you are looking for has been moved or doesn’t exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#781E16] to-[#F0511F] hover:from-[#410C09] hover:to-[#E23814] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#F0511F]/20"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/demo"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-[#5C4A45] hover:text-[#781E16] bg-[#FAF8F6] border border-[#F3E6DF] hover:bg-[#FEF4EE] transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Sample Audits</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
