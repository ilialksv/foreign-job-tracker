import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export type PlugProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export const Plug = ({ title, description, action, className }: PlugProps) => (
  <div
    className={cn(
      "flex flex-col items-center gap-2 rounded-xl border border-dashed border-line px-4 py-8 text-center",
      className,
    )}
  >
    <p className="text-sm font-medium text-ink">{title}</p>
    {description ? (
      <p className="max-w-md text-sm text-muted">{description}</p>
    ) : null}
    {action}
  </div>
);
