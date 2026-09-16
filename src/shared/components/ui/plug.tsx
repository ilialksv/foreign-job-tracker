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
      "border-line flex flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center",
      className,
    )}
  >
    <p className="text-ink text-sm font-medium">{title}</p>
    {description ? (
      <p className="text-muted max-w-md text-sm">{description}</p>
    ) : null}
    {action}
  </div>
);
