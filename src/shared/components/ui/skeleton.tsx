import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const Skeleton = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("animate-pulse rounded-md bg-surface-muted", className)}
    {...props}
  />
);
