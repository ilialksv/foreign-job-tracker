import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { RunSession } from "@/widgets/run/run-session/components/run-session";

import { useCompanyStep } from "../hooks/use-company-step";

export type CompanyStepProps = {
  companyId: string;
  taskId: string;
};

export const CompanyStep = ({ companyId, taskId }: CompanyStepProps) => {
  const { handleAfterComplete, handleSelectTask } = useCompanyStep({
    companyId,
  });

  return (
    <div className="flex flex-col gap-3">
      <Link
        to="/companies/$companyId/plan"
        params={{ companyId }}
        className="text-muted hover:text-ink inline-flex w-fit items-center gap-1.5 text-xs"
      >
        <ArrowLeft className="size-3.5" />
        Все этапы
      </Link>
      <RunSession
        companyId={companyId}
        taskId={taskId}
        onSelectTask={handleSelectTask}
        onAfterComplete={handleAfterComplete}
      />
    </div>
  );
};
