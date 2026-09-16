import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  state?: "default" | "error";
};

export const Checkbox = ({
  id,
  name,
  state = "default",
  className,
  ...props
}: CheckboxProps) => (
  <input
    id={id ?? name}
    name={name}
    type="checkbox"
    className={cn(
      "mt-0.5 size-4 shrink-0 accent-[var(--accent)]",
      { "outline-danger outline": state === "error" },
      className,
    )}
    {...props}
  />
);
