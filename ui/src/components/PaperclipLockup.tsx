import type { SVGProps } from "react";

interface PaperclipLockupProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  decorative?: boolean;
  title?: string;
}

/**
 * Project Auro Lockup — custom vector brand mark and typography.
 */
export function PaperclipLockup({
  decorative = false,
  title = "Project Auro",
  className,
  ...rest
}: PaperclipLockupProps) {
  return (
    <svg
      {...rest}
      className={className}
      viewBox="0 0 220 32"
      fill="currentColor"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      {/* Auro Brand Icon */}
      <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#auro-lockup-grad)" />
      <path d="M16 8 L23 23 L16 19.5 L9 23 Z" fill="#ffffff" />

      {/* PROJECT AURO Typography */}
      <text
        x="40"
        y="21"
        fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="16"
        fontWeight="800"
        letterSpacing="0.1em"
        fill="currentColor"
      >
        PROJECT AURO
      </text>

      <defs>
        <linearGradient id="auro-lockup-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
