import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

/** Поверхность содержимого. Визуально совпадает с Card: рамка, без тени. */
export const Panel = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "rounded-(--radius-panel) border border-line bg-surface",
      className,
    )}
    {...props}
  />
);
