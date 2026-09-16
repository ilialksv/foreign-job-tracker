import { Link } from "@tanstack/react-router";

import { CompanyStatusBadge } from "@/features/company/company-status-badge/components/company-status-badge";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { COMPANY_DEPTH_LABELS } from "@/shared/constants/company";
import { getCountryLabel } from "@/shared/constants/countries";
import type { Company } from "@/shared/types/entities";
import { formatDate } from "@/shared/utils/dates";

export type CompanyCardProps = {
  company: Company;
  openTasksCount: number;
};

export const CompanyCard = ({ company, openTasksCount }: CompanyCardProps) => (
  <Link
    to="/companies/$companyId"
    params={{ companyId: company.id }}
    className="flex flex-col gap-2 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-accent"
  >
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-sm font-semibold text-ink">{company.name}</span>
      <CompanyStatusBadge status={company.status} />
    </div>
    {company.info ? (
      <p className="line-clamp-2 text-sm text-muted">{company.info}</p>
    ) : null}
    <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
      <Badge tone="outline">{getCountryLabel(company.countryCode)}</Badge>
      <Badge tone="outline">{COMPANY_DEPTH_LABELS[company.depth]}</Badge>
      {company.queueTier ? (
        <Badge tone="outline">{company.queueTier}</Badge>
      ) : null}
      {openTasksCount > 0 ? (
        <Badge tone="accent">{openTasksCount} шагов открыто</Badge>
      ) : null}
      {company.lastTouchAt ? (
        <span>касание {formatDate(company.lastTouchAt)}</span>
      ) : null}
    </div>
  </Link>
);

export const CompanyCardSkeleton = () => (
  <div className="flex flex-col gap-2 rounded-xl border border-line bg-surface px-4 py-3">
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-24" />
  </div>
);
