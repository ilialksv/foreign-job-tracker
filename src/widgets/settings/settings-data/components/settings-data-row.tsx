import type { ReactNode } from "react";

export type SettingsDataRowProps = {
  title: string;
  description: string;
  control: ReactNode;
};

export const SettingsDataRow = ({
  title,
  description,
  control,
}: SettingsDataRowProps) => (
  <div className="grid gap-3 border-b border-line px-4 py-4 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:items-start md:gap-6">
    <div className="flex flex-col gap-1">
      <span className="text-[14px] font-medium text-ink">{title}</span>
      <p className="max-w-prose text-[12.5px] leading-relaxed text-muted">
        {description}
      </p>
    </div>
    <div className="flex flex-col gap-2">{control}</div>
  </div>
);
