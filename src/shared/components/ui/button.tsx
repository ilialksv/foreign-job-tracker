import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    icon?: ReactNode;
    iconPosition?: "left" | "right";
  };

export const Button = ({
  variant,
  size,
  block,
  icon,
  iconPosition = "left",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(buttonVariants({ variant, size, block }), className)}
    {...props}
  >
    {icon && iconPosition === "left" ? icon : null}
    {children}
    {icon && iconPosition === "right" ? icon : null}
  </button>
);
