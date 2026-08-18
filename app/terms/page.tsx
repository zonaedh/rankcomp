import { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | RankComp",
  description: "Read the Terms of Service governing the use of RankComp's competitor research and intelligence platform.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "August 18, 2026";

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 bg-[var(--bg-base)] transition-colors duration-300">
      {/* Top Header & Breadcrumb */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[#F0511F] px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border-theme)] shadow-2xs hover:bg-[var(--highlight-bg)] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-xs font-bold text-[#F0511F]">
            <Scale className="w-3.5 h-3.5 text-[#F0511F]" />
            <span>Terms of Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
            Terms of Service
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-subtle)]">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-[var(--surface-card)] rounded-3xl p-6 sm:p-10 border border-[var(--border-theme)] shadow-sm space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
        {/* 1. Acceptance */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#F0511F]" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p>
            By accessing or using the <strong>RankComp</strong> website, platform, and automated competitor audit tools (the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        {/* 2. Nature of Service */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#F0511F]" />
            <span>2. Nature of the Service</span>
          </h2>
          <p>
            RankComp provides automated public competitor research, ad intelligence aggregation, and performance benchmarking. All diagnostic information is gathered exclusively from publicly accessible endpoints, including open advertisement archives (e.g., Meta Ad Library), public search engine indices, and client-side web signals.
          </p>
          <p>
            RankComp does not engage in unlawful web intrusions, password bypasses, or unauthorized access to private corporate infrastructure.
          </p>
        </section>

        {/* 3. Acceptable Use */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#F0511F]" />
            <span>3. Acceptable Use Policy</span>
          </h2>
          <p>When using RankComp, you agree not to:</p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0511F] mt-2 shrink-0"></span>
              <span>Use the service for any illegal, malicious, or abusive activities.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0511F] mt-2 shrink-0"></span>
              <span>Attempt to overload, disrupt, or launch denial-of-service attacks against our platform.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0511F] mt-2 shrink-0"></span>
              <span>Misrepresent the source or ownership of generated reports when presenting data to third parties.</span>
            </li>
          </ul>
        </section>

        {/* 4. Estimations & Disclaimers */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#F0511F]" />
            <span>4. Metric Estimations & Third-Party Disclaimers</span>
          </h2>
          <p>
            Certain diagnostic metrics—such as estimated monthly ad spend, competitor opportunity values, and search impression shares—are modeled projections synthesized from public indicators and AI heuristic engines. While we strive for maximum accuracy, these figures represent statistical estimates and should not be considered certified financial statements.
          </p>
          <p>
            All third-party trademarks, brand names, and logos (including Facebook, Meta, Google, and Shopify) referenced in reports are the property of their respective owners. Their mention does not imply endorsement or affiliation.
          </p>
        </section>

        {/* 5. Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#F0511F]" />
            <span>5. Limitation of Liability</span>
          </h2>
          <p>
            In no event shall RankComp, its creators, or affiliates be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the platform or reliance on generated competitor reports.
          </p>
        </section>

        {/* 6. Contact */}
        <section className="space-y-3 pt-4 border-t border-[var(--border-theme)]">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#F0511F]" />
            <span>6. Contact Information</span>
          </h2>
          <p>
            For legal inquiries, terms clarification, or platform partnerships, please reach out to:
          </p>
          <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-1">
            <p className="font-bold text-[var(--text-primary)]">RankComp Legal & Operations</p>
            <p>Developer: Zonaed Hossain</p>
            <p>Website: <a href="https://zonaedhossain.com" target="_blank" rel="noopener noreferrer" className="text-[#F0511F] underline">zonaedhossain.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
