import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const Skeleton = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("bg-surface-muted animate-pulse rounded-md", className)}
    {...props}
  />
);
