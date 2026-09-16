import { Play } from "lucide-react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Plug } from "@/shared/components/ui/plug";
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
    tasks,
  } = useCompanyPlan({ companyId });

  if (isLoading) {
    return <CompanyPlanSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Этапы и задачи</CardTitle>
          <div className="flex gap-2">
            {hasPipeline ? null : (
              <Button
                size="sm"
                variant="primary"
                icon={<Play />}
                onClick={handleStartPipelineClick}
              >
                Запустить воронку
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="py-0">
          {tasks.length === 0 ? (
            <div className="py-4">
              <Plug
                title="Шагов пока нет"
                description="Запусти воронку — появятся триаж, разведка, отклик и коннекты."
              />
            </div>
          ) : (
            tasks.map((task) => (
              <CompanyPlanTask
                key={task.id}
                task={task}
                companyId={companyId}
                blocked={blockedTaskIds.has(task.id)}
                onSkip={handleSkipClick}
                onRemove={handleRemoveClick}
              />
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Добавить</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CompanyTaskForm companyId={companyId} />
          <CompanyStepForm companyId={companyId} />
        </CardContent>
      </Card>
    </div>
  );
};

export const CompanyPlanSkeleton = () => (
  <div className="flex flex-col gap-3">
    <ItemsList
      count={4}
      renderItem={(index) => <Skeleton key={index} className="h-16 w-full" />}
    />
  </div>
);
