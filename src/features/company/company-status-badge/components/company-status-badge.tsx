import { Badge } from "@/shared/components/ui/badge";
import {
  COMPANY_STATUS_LABELS,
  COMPANY_STATUS_TONES,
} from "@/shared/constants/company";
import type { CompanyStatus } from "@/shared/types/entities";

export type CompanyStatusBadgeProps = {
  status: CompanyStatus;
};

export const CompanyStatusBadge = ({ status }: CompanyStatusBadgeProps) => (
  <Badge tone={COMPANY_STATUS_TONES[status]}>
    {COMPANY_STATUS_LABELS[status]}
  </Badge>
);
