"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, FileText, ArrowRight, ShieldCheck, Video, Calendar, Sparkles } from "lucide-react";

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-[var(--surface-card)] border border-[var(--border-theme)] shadow-2xl p-6 sm:p-8 text-center z-10 my-8 overflow-hidden"
        >
          {/* Top decorative gradient glow */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[var(--text-subtle)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon in Emerald */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--highlight-bg)] border border-[var(--highlight-border)] text-xs font-bold text-[#FDA4AF] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E06859]" />
            <span>Dossier Dispatched & 1:1 Call Reserved</span>
          </div>

          <h3 className="text-2xl font-bold font-heading text-[var(--text-primary)] tracking-tight">
            You&apos;re All Set!
          </h3>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed max-w-md mx-auto">
            Your full 18-page intelligence dossier for{" "}
            <span className="font-semibold text-[#FDA4AF]">{domain}</span> has been dispatched to{" "}
            <span className="font-semibold text-[var(--text-primary)]">{email}</span>.
          </p>

          {/* 1:1 Consultation VIP Box */}
          <div className="my-5 p-4 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] text-left space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--highlight-bg)] border border-[var(--highlight-border)] flex items-center justify-center text-[#E06859] shrink-0">
                <Video className="w-5 h-5 text-[#E06859]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span>Your Free 30-Min 1:1 Strategy Call</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    $297 Free
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  Hosted by a 10+ Years Senior Full-Stack Marketing Manager to break down {domain}&apos;s money leaks.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border-theme)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#E06859]" />
                <span>Private calendar link sent to your email</span>
              </span>
              <span className="font-bold text-[#FDA4AF]">Check Inbox</span>
            </div>
          </div>

          {/* Document Teaser Card */}
          <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-theme)] text-left flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-theme)] flex items-center justify-center text-[#E06859] shrink-0 shadow-xs">
              <FileText className="w-5 h-5 text-[#E06859]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                  {domain.replace(/\.[^/.]+$/, "")}_Full_Audit_Dossier.pdf
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--highlight-bg)] text-[#FDA4AF] border border-[var(--highlight-border)]">
                  18 Pages
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 truncate">
                Includes active ad copies, backlink gaps & 30-day attack plan.
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="space-y-3 pt-5">
            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#E06859] hover:bg-[#D4594A] shadow-md shadow-[#E06859]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Done & Continue Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero spam policy • 100% confidential consultation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
