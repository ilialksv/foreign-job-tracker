import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label: string;
};

export const Checkbox = ({ label, className, ...props }: CheckboxProps) => (
  <label className="flex cursor-pointer items-start gap-2 text-sm text-ink">
    <input
      type="checkbox"
      className={cn("mt-0.5 size-4 accent-[var(--accent)]", className)}
      {...props}
    />
    <span>{label}</span>
  </label>
);
