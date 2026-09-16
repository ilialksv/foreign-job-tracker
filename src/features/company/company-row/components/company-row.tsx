import { Link } from "@tanstack/react-router";

import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { StatusDot } from "@/shared/components/ui/status-dot";
import {
  COMPANY_STATUS_LABELS,
  COMPANY_STATUS_TONES,
} from "@/shared/constants/company";
import { getCountryLabel } from "@/shared/constants/countries";
import type { Company } from "@/shared/types/entities";
import { formatDate } from "@/shared/utils/dates";

export type CompanyRowProps = {
  company: Company;
  openTasksCount: number;
};

export const CompanyRow = ({ company, openTasksCount }: CompanyRowProps) => (
  <Link
    to="/companies/$companyId"
    params={{ companyId: company.id }}
    className="group grid grid-cols-1 items-start gap-x-4 gap-y-1 border-b border-line px-4 py-3 transition-colors last:border-b-0 hover:bg-surface-2 md:grid-cols-[minmax(0,1fr)_170px_120px_92px] md:items-center"
  >
    <div className="flex min-w-0 items-start gap-2.5">
      <StatusDot
        tone={COMPANY_STATUS_TONES[company.status]}
        className="mt-2 md:mt-1.5"
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-[14.5px] leading-5 font-medium text-ink">
          {company.name}
        </span>
        {company.info ? (
          <span className="line-clamp-1 text-[12.5px] text-muted">
            {company.info}
          </span>
        ) : null}
      </div>
    </div>

    <span className="truncate pl-5 font-mono text-[12px] text-muted md:pl-0">
      {company.queueTier ?? getCountryLabel(company.countryCode)}
    </span>

    <span className="pl-5 md:pl-0">
      <Badge tone={COMPANY_STATUS_TONES[company.status]}>
        {COMPANY_STATUS_LABELS[company.status]}
      </Badge>
    </span>

    <span className="pl-5 font-mono text-[12px] text-muted tabular-nums md:pl-0 md:text-right">
      {openTasksCount > 0
        ? `${openTasksCount} шаг.`
        : company.lastTouchAt
          ? formatDate(company.lastTouchAt)
          : "—"}
    </span>
  </Link>
);

export const CompanyRowSkeleton = () => (
  <div className="flex items-center gap-3 border-b border-line px-4 py-3.5 last:border-b-0">
    <Skeleton className="size-1.5 rounded-full" />
    <Skeleton className="h-4 w-48" />
    <Skeleton className="ml-auto h-4 w-20" />
  </div>
);
