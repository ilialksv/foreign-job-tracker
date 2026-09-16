import { RunSession } from "@/widgets/run/run-session/components/run-session";

export type CompanyRunPageProps = {
  companyId: string;
};

export const CompanyRunPage = ({ companyId }: CompanyRunPageProps) => (
  <RunSession companyId={companyId} />
);
