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
    <div className="flex flex-col gap-4">
      <Link
        to="/companies/$companyId/plan"
        params={{ companyId }}
        className="inline-flex w-fit items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-muted uppercase hover:text-ink"
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
