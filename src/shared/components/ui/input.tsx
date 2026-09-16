import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const Input = ({ className, ...props }: ComponentProps<"input">) => (
  <input
    className={cn(
      "h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted/70 disabled:opacity-50",
      className,
    )}
    {...props}
  />
);
