import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "w-full rounded-lg border bg-surface text-sm text-ink transition-colors placeholder:text-muted/70 disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5",
        md: "h-10 px-3",
      },
      state: {
        default: "border-line focus-visible:border-accent",
        error: "border-danger",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export const textareaVariants = cva(
  "w-full rounded-lg border bg-surface px-3 py-2 text-sm text-ink transition-colors placeholder:text-muted/70 disabled:opacity-50",
  {
    variants: {
      state: {
        default: "border-line focus-visible:border-accent",
        error: "border-danger",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);
