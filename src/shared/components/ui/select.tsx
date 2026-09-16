import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { inputVariants } from "@/shared/constants/input-variants";
import { cn } from "@/shared/utils/cn";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = Omit<ComponentProps<"select">, "size"> &
  VariantProps<typeof inputVariants> & {
    options: SelectOption[];
    placeholder?: string;
  };

export const Select = ({
  id,
  name,
  size,
  state,
  options,
  placeholder,
  className,
  ...props
}: SelectProps) => (
  <select
    id={id ?? name}
    name={name}
    className={cn(
      inputVariants({ size, state }),
      "cursor-pointer appearance-none",
      className,
    )}
    {...props}
  >
    {placeholder ? <option value="">{placeholder}</option> : null}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
