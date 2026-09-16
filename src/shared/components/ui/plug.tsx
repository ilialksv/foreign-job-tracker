import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export type PlugProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

/** Пустое состояние: спокойный белый блок, без пунктира и лишних линий. */
export const Plug = ({ title, description, action, className }: PlugProps) => (
  <div
    className={cn(
      "flex flex-col items-start gap-2 rounded-(--radius-panel) border border-line bg-surface px-4 py-6",
      className,
    )}
  >
    <p className="font-display text-[15px] font-semibold text-ink">{title}</p>
    {description ? (
      <p className="max-w-prose text-[13px] leading-relaxed text-muted">
        {description}
      </p>
    ) : null}
    {action ? <div className="pt-1">{action}</div> : null}
  </div>
);
