import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const Textarea = ({
  className,
  rows = 4,
  ...props
}: ComponentProps<"textarea">) => (
  <textarea
    rows={rows}
    className={cn(
      "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/70 disabled:opacity-50",
      className,
    )}
    {...props}
  />
);
