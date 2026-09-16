import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export type FieldProps = {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
};

export const Field = ({ label, hint, className, children }: FieldProps) => (
  <label className={cn("flex flex-col gap-1.5", className)}>
    <span className="text-muted text-xs font-medium tracking-wide uppercase">
      {label}
    </span>
    {children}
    {hint ? <span className="text-muted text-xs">{hint}</span> : null}
  </label>
);
