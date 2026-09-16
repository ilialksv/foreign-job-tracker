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
  <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
    <div className="flex flex-col gap-1">
      <h1 className="font-display text-[26px] leading-8 font-semibold text-ink">
        {title}
      </h1>
      {description ? (
        <p className="max-w-prose text-[14px] text-muted">{description}</p>
      ) : null}
    </div>
    {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
  </header>
);
