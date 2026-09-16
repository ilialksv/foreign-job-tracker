import { cva } from "class-variance-authority";

/** Те же высоты, что у кнопок: sm 32, md 36. */
export const inputVariants = cva(
  "w-full rounded-(--radius-control) border bg-surface text-[14px] text-ink transition-colors placeholder:text-muted/60 disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5",
        md: "h-9 px-3",
      },
      state: {
        default: "border-line hover:border-line-2 focus-visible:border-accent",
        error: "border-stop",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export const textareaVariants = cva(
  "w-full rounded-(--radius-control) border bg-surface px-3 py-2 text-[14px] leading-relaxed text-ink transition-colors placeholder:text-muted/60 disabled:opacity-50",
  {
    variants: {
      state: {
        default: "border-line hover:border-line-2 focus-visible:border-accent",
        error: "border-stop",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);
