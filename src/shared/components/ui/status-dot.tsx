import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { statusDotVariants } from "@/shared/constants/badge-variants";
import { cn } from "@/shared/utils/cn";

export type StatusDotProps = ComponentProps<"span"> &
  VariantProps<typeof statusDotVariants>;

export const StatusDot = ({ tone, className, ...props }: StatusDotProps) => (
  <span className={cn(statusDotVariants({ tone }), className)} {...props} />
);
