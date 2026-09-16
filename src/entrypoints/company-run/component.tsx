import { RunSession } from "@/widgets/run/run-session/components/run-session";

export type CompanyRunPageProps = {
  companyId: string;
  taskId?: string;
};

export const CompanyRunPage = ({ companyId, taskId }: CompanyRunPageProps) => (
  <RunSession key={taskId ?? "auto"} companyId={companyId} taskId={taskId} />
);
