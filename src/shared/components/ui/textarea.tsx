import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { textareaVariants } from "@/shared/constants/input-variants";
import { cn } from "@/shared/utils/cn";

export type TextareaProps = ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>;

export const Textarea = ({
  id,
  name,
  state,
  rows = 4,
  className,
  ...props
}: TextareaProps) => (
  <textarea
    id={id ?? name}
    name={name}
    rows={rows}
    className={cn(textareaVariants({ state }), className)}
    {...props}
  />
);
