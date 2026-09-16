import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import {
  badgeVariants,
  statusDotVariants,
} from "@/shared/constants/badge-variants";
import { cn } from "@/shared/utils/cn";

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    withDot?: boolean;
  };

export const Badge = ({
  tone,
  withDot = false,
  className,
  children,
  ...props
}: BadgeProps) => (
  <span className={cn(badgeVariants({ tone }), className)} {...props}>
    {withDot ? <span className={statusDotVariants({ tone })} /> : null}
    {children}
  </span>
);
