import type { ReactNode } from "react";

export type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export const PageHeader = ({
  title,
  description,
  actions,
}: PageHeaderProps) => (
  <header className="flex flex-wrap items-end justify-between gap-3">
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-semibold tracking-tight text-ink">{title}</h1>
      {description ? <p className="text-sm text-muted">{description}</p> : null}
    </div>
    {actions ? <div className="flex gap-2">{actions}</div> : null}
  </header>
);
