import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "bg-surface-muted text-muted",
        accent: "bg-accent-soft text-accent",
        danger: "bg-danger-soft text-danger",
        warn: "bg-warn-soft text-warn",
        ok: "bg-ok-soft text-ok",
        outline: "border border-line text-muted",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);
