import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-accent text-surface hover:opacity-90 dark:text-ground",
        secondary: "border-line bg-surface text-ink hover:bg-surface-muted",
        ghost: "border-transparent bg-transparent text-muted hover:text-ink",
        danger:
          "border-transparent bg-danger text-surface hover:opacity-90 dark:text-ground",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-5 text-base",
        icon: "size-9",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
      block: false,
    },
  },
);
