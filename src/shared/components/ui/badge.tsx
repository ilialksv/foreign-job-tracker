import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { badgeVariants } from "@/shared/constants/badge-variants";
import { cn } from "@/shared/utils/cn";

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export const Badge = ({ tone, className, children, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ tone }), className)} {...props}>
    {children}
  </span>
);
