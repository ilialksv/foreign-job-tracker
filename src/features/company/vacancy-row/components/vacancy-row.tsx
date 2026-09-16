import { ExternalLink, Trash2 } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
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
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-2 last:border-b-0">
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-ink">{vacancy.title}</span>
          <Badge tone={VACANCY_STATUS_TONES[vacancy.status]}>
            {VACANCY_STATUS_LABELS[vacancy.status]}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>{VACANCY_SOURCE_LABELS[vacancy.source]}</span>
          <span>найдена {formatDate(vacancy.foundAt)}</span>
          {vacancy.appliedAt ? (
            <span>отклик {formatDate(vacancy.appliedAt)}</span>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {vacancy.url ? (
          <a
            href={vacancy.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted hover:text-ink"
          >
            <ExternalLink className="size-4" />
          </a>
        ) : null}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemoveClick}
          icon={<Trash2 />}
          aria-label="Удалить вакансию"
        />
      </div>
    </div>
  );
};
