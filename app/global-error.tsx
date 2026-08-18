"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[RankComp Fatal Global Error]:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF8F6] text-[#1E1715] flex items-center justify-center p-4 font-sans antialiased">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-[#F3E6DF] shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF4EE] text-[#F0511F] mx-auto flex items-center justify-center font-bold text-xl">
            !
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#1E1715]">Application Error</h2>
            <p className="text-xs sm:text-sm text-[#5C4A45]">
              A critical error occurred while loading the application.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="w-full py-3 px-6 rounded-xl font-bold text-white bg-[#F0511F] hover:bg-[#E23814] transition-all cursor-pointer"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
