import { Link } from "@tanstack/react-router";
import { Pencil, Play, Trash2 } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Select } from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { buttonVariants } from "@/shared/constants/button-variants";
import {
  COMPANY_DEPTH_LABELS,
  COMPANY_STATUS_LABELS,
  COMPANY_STATUS_ORDER,
  ENGINEERING_SIZE_LABELS,
} from "@/shared/constants/company";
import { getCountryLabel } from "@/shared/constants/countries";
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
    openTasksCount,
  } = useCompanySummary({ companyId });

  if (isLoading) {
    return <CompanySummarySkeleton />;
  }

  if (!company) {
    return (
      <Card>
        <CardContent>
          <p className="text-muted text-sm">Компания не найдена.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle>{company.name}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge tone="outline">{getCountryLabel(company.countryCode)}</Badge>
            <Badge tone="outline">{COMPANY_DEPTH_LABELS[company.depth]}</Badge>
            <Badge tone="outline">
              {ENGINEERING_SIZE_LABELS[company.engineeringSize]}
            </Badge>
            {company.queueTier ? (
              <Badge tone="outline">{company.queueTier}</Badge>
            ) : null}
            {openTasksCount > 0 ? (
              <Badge tone="accent">{openTasksCount} шагов открыто</Badge>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            className="h-9 w-44"
            value={company.status}
            options={STATUS_OPTIONS}
            onChange={handleStatusChange}
          />
          <Button
            variant="ghost"
            size="icon"
            icon={<Pencil />}
            onClick={handleEditClick}
            aria-label="Изменить"
          />
          <Button
            variant="ghost"
            size="icon"
            icon={<Trash2 />}
            onClick={handleRemoveClick}
            aria-label="Удалить"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {company.info ? (
          <p className="text-muted text-sm whitespace-pre-wrap">
            {company.info}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 text-sm">
          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="text-accent"
            >
              Сайт
            </a>
          ) : null}
          {company.careersUrl ? (
            <a
              href={company.careersUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent"
            >
              Careers
            </a>
          ) : null}
          {company.lastTouchAt ? (
            <span className="text-muted">
              последнее касание {formatDate(company.lastTouchAt)}
            </span>
          ) : null}
          {company.reviveAt ? (
            <span className="text-muted">
              реанимация {formatDate(company.reviveAt)}
            </span>
          ) : null}
        </div>

        {company.excludeReason ? (
          <p className="text-danger text-sm">
            Стоп-сигнал: {company.excludeReason}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {hasPipeline ? (
            <Link
              to="/companies/$companyId/plan"
              params={{ companyId }}
              className={buttonVariants({ variant: "primary" })}
            >
              <Play className="size-4" />
              Перейти к этапам
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
        </div>
      </CardContent>

      {isEditOpen ? (
        <CompanyFormDialog
          company={company}
          defaultCountryCode={company.countryCode}
          onClose={handleEditClose}
        />
      ) : null}
    </Card>
  );
};

export const CompanySummarySkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-9 w-44" />
    </CardHeader>
    <CardContent className="flex flex-col gap-3">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-10 w-48" />
    </CardContent>
  </Card>
);
