import { Link } from "@tanstack/react-router";
import { Play, Plus } from "lucide-react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Plug } from "@/shared/components/ui/plug";
import { Select } from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useCompanyPlan } from "../hooks/use-company-plan";
import { CompanyPlanTask } from "./company-plan-task";

export type CompanyPlanProps = {
  companyId: string;
};

export const CompanyPlan = ({ companyId }: CompanyPlanProps) => {
  const {
    blockedTaskIds,
    handleAddCustomTaskClick,
    handleAddStepClick,
    handleRemoveClick,
    handleSkipClick,
    handleStartPipelineClick,
    handleStepKeyChange,
    handleValuesChange,
    hasPipeline,
    isLoading,
    onDemandStepOptions,
    stepKey,
    tasks,
    values,
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
            {hasPipeline ? (
              <Link
                to="/companies/$companyId/run"
                params={{ companyId }}
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                <Play className="size-4" />
                Режим выполнения
              </Link>
            ) : (
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
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium tracking-wide text-muted uppercase">
              Своя задача
            </span>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
              <Input
                name="title"
                value={values.title}
                onChange={handleValuesChange}
                placeholder="Например: проверить careers через неделю"
              />
              <Input
                name="dueAt"
                type="date"
                value={values.dueAt}
                onChange={handleValuesChange}
              />
              <Button icon={<Plus />} onClick={handleAddCustomTaskClick}>
                Добавить
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium tracking-wide text-muted uppercase">
              Шаг воронки
            </span>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <Select
                value={stepKey}
                options={onDemandStepOptions}
                placeholder="Выбрать шаг"
                onChange={handleStepKeyChange}
              />
              <Button icon={<Plus />} onClick={handleAddStepClick}>
                Добавить шаг
              </Button>
            </div>
          </div>
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
