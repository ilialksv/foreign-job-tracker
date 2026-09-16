import { Play } from "lucide-react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Section } from "@/shared/components/layouts/section";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useCompanyPlan } from "../hooks/use-company-plan";
import { CompanyPlanTask } from "./company-plan-task";
import { CompanyStepForm } from "./company-step-form";
import { CompanyTaskForm } from "./company-task-form";

export type CompanyPlanProps = {
  companyId: string;
};

export const CompanyPlan = ({ companyId }: CompanyPlanProps) => {
  const {
    blockedTaskIds,
    handleRemoveClick,
    handleSkipClick,
    handleStartPipelineClick,
    hasPipeline,
    isLoading,
    openTasksCount,
    tasks,
  } = useCompanyPlan({ companyId });

  if (isLoading) {
    return <CompanyPlanSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8">
      <Section
        title="Этапы и задачи"
        meta={openTasksCount > 0 ? `${openTasksCount} открыто` : undefined}
        description="Клик по строке открывает шаг."
        contentClassName="pb-1.5"
        divided
        actions={
          hasPipeline ? null : (
            <Button
              size="sm"
              variant="primary"
              icon={<Play />}
              onClick={handleStartPipelineClick}
            >
              Запустить воронку
            </Button>
          )
        }
      >
        {tasks.length === 0 ? (
          <p className="px-0 py-3 text-[13px] text-muted">
            Шагов пока нет. Запусти воронку — появятся триаж, разведка, отклик и
            коннекты.
          </p>
        ) : (
          <div className="flex flex-col">
            {tasks.map((task) => (
              <CompanyPlanTask
                key={task.id}
                task={task}
                companyId={companyId}
                blocked={blockedTaskIds.has(task.id)}
                onSkip={handleSkipClick}
                onRemove={handleRemoveClick}
              />
            ))}
          </div>
        )}
      </Section>

      <Section
        title="Добавить"
        description="Своя задача с датой или шаг воронки вне очереди"
        contentClassName="flex flex-col gap-5"
      >
        <CompanyTaskForm companyId={companyId} />
        <CompanyStepForm companyId={companyId} />
      </Section>
    </div>
  );
};

export const CompanyPlanSkeleton = () => (
  <div className="flex flex-col gap-3">
    <ItemsList
      count={5}
      renderItem={(index) => <Skeleton key={index} className="h-12 w-full" />}
    />
  </div>
);
