import { CompanyPlan } from "@/widgets/company/company-plan/components/company-plan";

export type CompanyPlanPageProps = {
  companyId: string;
};

export const CompanyPlanPage = ({ companyId }: CompanyPlanPageProps) => (
  <CompanyPlan companyId={companyId} />
);
