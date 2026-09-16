import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { inputVariants } from "@/shared/constants/input-variants";
import { cn } from "@/shared/utils/cn";

export type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>;

export const Input = ({
  id,
  name,
  size,
  state,
  className,
  ...props
}: InputProps) => (
  <input
    id={id ?? name}
    name={name}
    className={cn(inputVariants({ size, state }), className)}
    {...props}
  />
);
