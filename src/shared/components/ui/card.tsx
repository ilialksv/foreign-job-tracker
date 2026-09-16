import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

/** Спокойная поверхность: рамка в волос, без тени. */
export const Card = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "rounded-(--radius-panel) border border-line bg-surface shadow-(--shadow-panel)",
      className,
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-wrap items-start justify-between gap-3 px-4 pt-3.5 pb-3",
      className,
    )}
    {...props}
  />
);

export const CardTitle = ({ className, ...props }: ComponentProps<"h2">) => (
  <h2
    className={cn(
      "font-display text-[15px] leading-6 font-semibold text-ink",
      className,
    )}
    {...props}
  />
);

export const CardContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("px-4 pb-4", className)} {...props} />
);
