import type { SVGProps } from "react";
import { cn } from "../lib/utils";

export function AnimatedPaperclipIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-6 text-indigo-500 animate-pulse", className)}
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="20 10"
        className="opacity-40 animate-spin"
        style={{ animationDuration: "6s" }}
      />
      <path
        d="M16 6 L24 22 L16 18 L8 22 Z"
        fill="currentColor"
        className="opacity-90"
      />
    </svg>
  );
}

/** Full-page loading state: a centered, futuristic Project Auro animated loader. */
export function PaperclipLoading({ className }: { className?: string }) {
  return (
    <div
      role="status"
      className={cn("flex min-h-dvh w-full flex-col items-center justify-center gap-4 bg-background", className)}
    >
      <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 shadow-xl shadow-indigo-500/20 text-white font-mono text-xl font-black">
        <span>AU</span>
        <div className="absolute inset-0 rounded-2xl border border-white/20 animate-ping opacity-25" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
          PROJECT AURO
        </span>
        <span className="text-[11px] text-muted-foreground">Initializing local agent environment...</span>
      </div>
    </div>
  );
}
