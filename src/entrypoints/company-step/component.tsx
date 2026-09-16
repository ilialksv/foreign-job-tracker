import { CompanyStep } from "@/widgets/company/company-step/components/company-step";

export type CompanyStepPageProps = {
  companyId: string;
  taskId: string;
};

export const CompanyStepPage = ({
  companyId,
  taskId,
}: CompanyStepPageProps) => (
  <CompanyStep companyId={companyId} taskId={taskId} />
);
