import { ExternalLink, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { buttonVariants } from "@/shared/constants/button-variants";
import {
  VACANCY_SOURCE_LABELS,
  VACANCY_STATUS_LABELS,
  VACANCY_STATUS_TONES,
} from "@/shared/constants/vacancies";
import type { Vacancy } from "@/shared/types/entities";
import { formatDate } from "@/shared/utils/dates";

export type VacancyRowProps = {
  vacancy: Vacancy;
  onRemove: (params: { id: string }) => void;
};

export const VacancyRow = ({ vacancy, onRemove }: VacancyRowProps) => {
  const handleRemoveClick = () => {
    onRemove({ id: vacancy.id });
  };

  return (
    <div className="flex items-start justify-between gap-3 border-b border-line py-2.5 last:border-b-0">
      <div className="flex min-w-0 items-start gap-2.5">
        <StatusDot
          tone={VACANCY_STATUS_TONES[vacancy.status]}
          className="mt-2"
        />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[14px] leading-5 font-medium text-ink">
            {vacancy.title}
          </span>
          <span className="font-mono text-[11.5px] text-muted">
            {VACANCY_STATUS_LABELS[vacancy.status]} ·{" "}
            {VACANCY_SOURCE_LABELS[vacancy.source]}
            {vacancy.appliedAt
              ? ` · отклик ${formatDate(vacancy.appliedAt)}`
              : ` · найдена ${formatDate(vacancy.foundAt)}`}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-0.5">
        {vacancy.url ? (
          <a
            href={vacancy.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Открыть вакансию"
            className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
          >
            <ExternalLink className="size-3.5" />
          </a>
        ) : null}
        <Button
          variant="danger-ghost"
          size="icon-sm"
          onClick={handleRemoveClick}
          icon={<Trash2 />}
          aria-label="Удалить вакансию"
        />
      </div>
    </div>
  );
};
