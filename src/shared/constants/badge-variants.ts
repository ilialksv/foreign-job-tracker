import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[12px] leading-5 font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "bg-surface-2 text-ink-2",
        accent: "bg-accent-soft text-accent",
        danger: "bg-stop-soft text-stop",
        warn: "bg-attention-soft text-attention",
        ok: "bg-done-soft text-done",
        outline: "border border-line text-muted",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export const statusDotVariants = cva(
  "inline-block size-1.5 shrink-0 rounded-full",
  {
    variants: {
      tone: {
        neutral: "bg-line-2",
        accent: "bg-accent",
        danger: "bg-stop",
        warn: "bg-attention",
        ok: "bg-done",
        outline: "bg-line-2",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);
