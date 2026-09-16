import { cva } from "class-variance-authority";

/**
 * Единая шкала высот для всех интерактивных элементов: sm 32, md 36, lg 44.
 * Иконочные кнопки повторяют те же высоты, чтобы строка из кнопок, инпутов и
 * селектов выравнивалась без подгонок.
 */
export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-(--radius-control) border font-medium whitespace-nowrap transition-[background-color,border-color,color,opacity] disabled:pointer-events-none disabled:opacity-45 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-accent bg-accent text-accent-ink hover:bg-accent/90 active:bg-accent",
        secondary:
          "border-line bg-surface text-ink hover:border-line-2 hover:bg-surface-2",
        ghost:
          "border-transparent bg-transparent text-muted hover:bg-surface-2 hover:text-ink",
        danger: "border-stop bg-stop text-accent-ink hover:bg-stop/90",
        "danger-ghost":
          "border-transparent bg-transparent text-stop hover:bg-stop-soft hover:text-stop",
      },
      size: {
        sm: "h-8 gap-1.5 px-3 text-[13px] [&_svg]:size-3.5",
        md: "h-9 px-3.5 text-[14px] [&_svg]:size-4",
        lg: "h-11 px-5 text-[15px] [&_svg]:size-4",
        icon: "size-9 [&_svg]:size-4",
        "icon-sm": "size-8 [&_svg]:size-3.5",
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
