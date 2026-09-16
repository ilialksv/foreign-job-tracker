import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = ComponentProps<"select"> & {
  options: SelectOption[];
  placeholder?: string;
};

export const Select = ({
  options,
  placeholder,
  className,
  ...props
}: SelectProps) => (
  <select
    className={cn(
      "h-10 w-full cursor-pointer appearance-none rounded-lg border border-line bg-surface px-3 text-sm text-ink disabled:opacity-50",
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
