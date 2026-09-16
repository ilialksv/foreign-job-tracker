import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const Card = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("rounded-xl border border-line bg-surface", className)}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-wrap items-start justify-between gap-3 border-b border-line px-4 py-3",
      className,
    )}
    {...props}
  />
);

export const CardTitle = ({ className, ...props }: ComponentProps<"h2">) => (
  <h2 className={cn("text-sm font-semibold text-ink", className)} {...props} />
);

export const CardContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("px-4 py-3", className)} {...props} />
);
