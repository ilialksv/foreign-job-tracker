import { Link } from "@tanstack/react-router";
import { Pencil, Play, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Select } from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  COMPANY_STATUS_LABELS,
  COMPANY_STATUS_ORDER,
} from "@/shared/constants/company";
import { buttonVariants } from "@/shared/constants/button-variants";
import { formatDate } from "@/shared/utils/dates";
import { CompanyFormDialog } from "@/widgets/companies/company-form-dialog/components/company-form-dialog";

import { useCompanySummary } from "../hooks/use-company-summary";

export type CompanySummaryProps = {
  companyId: string;
};

const STATUS_OPTIONS = COMPANY_STATUS_ORDER.map((status) => ({
  value: status,
  label: COMPANY_STATUS_LABELS[status],
}));

export const CompanySummary = ({ companyId }: CompanySummaryProps) => {
  const {
    company,
    handleEditClick,
    handleEditClose,
    handleRemoveClick,
    handleStartPipelineClick,
    handleStatusChange,
    hasPipeline,
    isEditOpen,
    isLoading,
    metaItems,
    openTasksCount,
  } = useCompanySummary({ companyId });

  if (isLoading) {
    return <CompanySummarySkeleton />;
  }

  if (!company) {
    return <p className="text-[14px] text-muted">Компания не найдена.</p>;
  }

  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h1 className="font-display text-[26px] leading-8 font-semibold text-ink">
            {company.name}
          </h1>
          <p className="font-mono text-[12px] text-muted">
            {metaItems.join(" · ")}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <Select
            size="sm"
            className="w-40"
            value={company.status}
            options={STATUS_OPTIONS}
            onChange={handleStatusChange}
            aria-label="Статус компании"
          />
          <Button
            variant="ghost"
            size="icon"
            icon={<Pencil />}
            onClick={handleEditClick}
            aria-label="Изменить компанию"
          />
          <Button
            variant="ghost"
            size="icon"
            icon={<Trash2 />}
            onClick={handleRemoveClick}
            aria-label="Удалить компанию"
          />
        </div>
      </div>

      {company.info ? (
        <p className="max-w-prose text-[14px] leading-relaxed whitespace-pre-wrap text-ink-2">
          {company.info}
        </p>
      ) : null}

      {company.excludeReason ? (
        <p className="max-w-prose text-[13px] text-stop">
          Стоп-сигнал: {company.excludeReason}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {hasPipeline ? (
          <Link
            to="/companies/$companyId/plan"
            params={{ companyId }}
            className={buttonVariants({ variant: "primary" })}
          >
            <Play className="size-4" />
            {openTasksCount > 0
              ? `Продолжить · ${openTasksCount} шагов`
              : "Открыть этапы"}
          </Link>
        ) : (
          <Button
            variant="primary"
            icon={<Play />}
            onClick={handleStartPipelineClick}
          >
            Запустить воронку
          </Button>
        )}

        {company.website ? (
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-accent underline-offset-4 hover:underline"
          >
            Сайт
          </a>
        ) : null}
        {company.careersUrl ? (
          <a
            href={company.careersUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-accent underline-offset-4 hover:underline"
          >
            Careers
          </a>
        ) : null}
        {company.lastTouchAt ? (
          <span className="font-mono text-[12px] text-muted">
            касание {formatDate(company.lastTouchAt)}
          </span>
        ) : null}
        {company.reviveAt ? (
          <span className="font-mono text-[12px] text-muted">
            реанимация {formatDate(company.reviveAt)}
          </span>
        ) : null}
      </div>

      {isEditOpen ? (
        <CompanyFormDialog
          company={company}
          defaultCountryCode={company.countryCode}
          onClose={handleEditClose}
        />
      ) : null}
    </header>
  );
};

export const CompanySummarySkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-3 w-80" />
    <Skeleton className="h-4 w-full max-w-prose" />
    <Skeleton className="h-9.5 w-48" />
  </div>
);
