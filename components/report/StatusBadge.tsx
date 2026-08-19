import { CheckCircle2, XCircle, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "running" | "not_running" | "good" | "warning" | "optimal";
  customText?: string;
  className?: string;
  size?: "sm" | "md";
}

export default function StatusBadge({
  status,
  customText,
  className,
  size = "md",
}: StatusBadgeProps) {
  const configs = {
    running: {
      bg: "bg-[var(--highlight-bg)] text-[#E7AD72] border-[var(--highlight-border)]",
      dot: "bg-[#DA7735]",
      icon: CheckCircle2,
      defaultText: "Active / Running",
    },
    not_running: {
      bg: "bg-[var(--surface-subtle)] text-[var(--text-subtle)] border-[var(--border-theme)]",
      dot: "bg-[var(--text-subtle)]",
      icon: XCircle,
      defaultText: "Not Found / Inactive",
    },
    good: {
      bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      dot: "bg-emerald-500",
      icon: CheckCircle2,
      defaultText: "Optimal Score",
    },
    warning: {
      bg: "bg-amber-500/10 text-[#E19456] border-amber-500/30",
      dot: "bg-[#E19456]",
      icon: AlertTriangle,
      defaultText: "Needs Attention",
    },
    optimal: {
      bg: "bg-[var(--highlight-bg)] text-[#E7AD72] border-[var(--highlight-border)]",
      dot: "bg-[#DA7735]",
      icon: Sparkles,
      defaultText: "High Impact",
    },
  };

  const config = configs[status] || configs.running;
  const Icon = config.icon;
  const text = customText || config.defaultText;

  const sizeClasses =
    size === "sm" ? "px-2.5 py-1 text-xs gap-1.5" : "px-3 py-1.5 text-xs font-semibold gap-2";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border shadow-2xs transition-all font-sans",
        config.bg,
        sizeClasses,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", config.dot)} />
      <Icon className="w-3.5 h-3.5" />
      <span>{text}</span>
    </span>
  );
}
