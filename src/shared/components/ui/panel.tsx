import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

/** Приподнятая поверхность. На экране такая должна быть одна. */
export const Panel = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "rounded-(--radius-panel) border border-line bg-raised shadow-(--shadow-raised)",
      className,
    )}
    {...props}
  />
);
