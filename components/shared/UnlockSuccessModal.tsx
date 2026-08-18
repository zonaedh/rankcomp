"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, FileText, ArrowRight, X, ShieldCheck } from "lucide-react";

interface UnlockSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  domain: string;
}

export default function UnlockSuccessModal({
  isOpen,
  onClose,
  email,
  domain,
}: UnlockSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[var(--surface-card)] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[var(--border-theme)] z-10 overflow-hidden text-center"
        >
          {/* Top decorative gradient glow */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#781E16] via-[#F0511F] to-[#F58458]" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[var(--text-subtle)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon in Coral */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[var(--highlight-bg)] border border-[var(--highlight-border)] flex items-center justify-center text-[#F0511F] mb-5 shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h3 className="text-2xl font-bold font-heading text-[var(--text-primary)] tracking-tight">
            Full Audit Request Received!
          </h3>

          <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed max-w-md mx-auto">
            Thanks! Your full comprehensive intelligence dossier for{" "}
            <span className="font-semibold text-[#F0511F]">{domain}</span> is being generated and will be delivered to{" "}
            <span className="font-semibold text-[var(--text-primary)]">{email}</span> within 5 minutes.
          </p>

          {/* Document Teaser Card */}
          <div className="my-6 p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] text-left flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--surface)] border border-[var(--border-theme)] flex items-center justify-center text-[#F0511F] shrink-0 shadow-xs">
              <FileText className="w-6 h-6 text-[#F0511F]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                  {domain.replace(/\.[^/.]+$/, "")}_Competitor_Audit_2026.pdf
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--highlight-bg)] text-[#F0511F] border border-[var(--highlight-border)]">
                  18 Pages
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Includes full ad copies, backlink gaps, and 90-day growth strategy playbook.
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#781E16] to-[#F0511F] hover:from-[#410C09] hover:to-[#E23814] shadow-md shadow-[#F0511F]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Done & Continue Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F0511F]" />
              <span>Zero spam policy • 100% confidential research</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
