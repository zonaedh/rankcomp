import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, Eye, Database, Bell, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | RankComp",
  description: "Learn how RankComp protects your privacy and handles public competitor research data safely.",
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#F0511F]" />
            <span>Privacy & Data Protection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-subtle)]">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-[var(--surface-card)] rounded-3xl p-6 sm:p-10 border border-[var(--border-theme)] shadow-sm space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#F0511F]" />
            <span>1. Our Commitment to Your Privacy</span>
          </h2>
          <p>
            At <strong>RankComp</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), we take your privacy seriously. This Privacy Policy explains what information we collect, how we process public digital signals, and how we safeguard your personal data when you use our website and competitor intelligence platform.
          </p>
          <p>
            RankComp is built on a <strong>non-intrusive, privacy-first architecture</strong>. We do not install spy software on target websites, nor do we access private user accounts or restricted databases.
          </p>
        </section>

        {/* What information we collect */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <Database className="w-5 h-5 text-[#F0511F]" />
            <span>2. Information We Collect</span>
          </h2>
          <ul className="space-y-2.5 pl-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0511F] mt-2 shrink-0"></span>
              <span>
                <strong className="text-[var(--text-primary)]">Public Competitor Search Inputs:</strong> When you enter a competitor website domain or Facebook page handle, our system queries publicly accessible APIs and web endpoints (such as the Meta Ad Library and Google PageSpeed Insights).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0511F] mt-2 shrink-0"></span>
              <span>
                <strong className="text-[var(--text-primary)]">Lead Contact Information:</strong> When you voluntarily request a full PDF dossier or report download, we collect your business email address and optional name to deliver the requested document.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0511F] mt-2 shrink-0"></span>
              <span>
                <strong className="text-[var(--text-primary)]">Local User Preferences:</strong> We use your browser&apos;s <code>localStorage</code> solely to remember your chosen theme preference (Dark or Light mode).
              </span>
            </li>
          </ul>
        </section>

        {/* Public Data Aggregation */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#F0511F]" />
            <span>3. How We Process Public Competitor Data</span>
          </h2>
          <p>
            RankComp aggregates data exclusively from publicly open and officially sanctioned sources, including:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0511F] mt-2 shrink-0"></span>
              <span><strong>Meta Ad Library:</strong> Public advertisement creatives, copy hooks, and transparency records.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0511F] mt-2 shrink-0"></span>
              <span><strong>Google PageSpeed Insights:</strong> Public Core Web Vitals speed and performance scores.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0511F] mt-2 shrink-0"></span>
              <span><strong>Public DOM & DNS Telemetry:</strong> Public HTML meta tags, OpenGraph descriptions, and conversion pixel identifiers.</span>
            </li>
          </ul>
        </section>

        {/* Zero Spam Guarantee */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#F0511F]" />
            <span>4. Zero-Spam & Data Selling Guarantee</span>
          </h2>
          <p>
            We strictly enforce a <strong>Zero-Spam Policy</strong>. We will never sell, rent, or trade your email address or business data to third-party advertisers or data brokers.
          </p>
          <p>
            Your email is only used to deliver your requested competitor dossier and relevant updates regarding your audit. You can unsubscribe or request data deletion at any time with a single click.
          </p>
        </section>

        {/* Contact Us */}
        <section className="space-y-3 pt-4 border-t border-[var(--border-theme)]">
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#F0511F]" />
            <span>5. Contact & Data Inquiries</span>
          </h2>
          <p>
            If you have any questions about this Privacy Policy, your personal data, or wish to request data removal, please contact our team:
          </p>
          <div className="p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] space-y-1">
            <p className="font-bold text-[var(--text-primary)]">RankComp Data Privacy Team</p>
            <p>Lead Developer: Zonaed Hossain</p>
            <p>Website: <a href="https://zonaedhossain.com" target="_blank" rel="noopener noreferrer" className="text-[#F0511F] underline">zonaedhossain.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
