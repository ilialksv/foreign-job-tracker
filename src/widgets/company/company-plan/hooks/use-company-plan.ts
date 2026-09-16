import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useSkipTask } from "@/actions/pipeline/hooks/use-skip-task";
import { useStartPipeline } from "@/actions/pipeline/hooks/use-start-pipeline";
import { useGetTasks } from "@/actions/tasks/hooks/use-get-tasks";
import { useRemoveTask } from "@/actions/tasks/hooks/use-remove-task";
import { isTaskBlocked } from "@/lib/pipeline";

export const useCompanyPlan = (params: { companyId: string }) => {
  const tasksQuery = useGetTasks();
  const removeTask = useRemoveTask();
  const skipTask = useSkipTask();
  const startPipeline = useStartPipeline();

  const allTasks = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data]);

  const tasks = useMemo(
    () =>
      allTasks
        .filter((task) => task.companyId === params.companyId)
        .sort((left, right) => {
          if (left.order !== right.order) {
            return left.order - right.order;
          }

          return left.createdAt < right.createdAt ? -1 : 1;
        }),
    [allTasks, params.companyId],
  );

  const blockedTaskIds = useMemo(() => {
    const blocked = new Set<string>();

    tasks.forEach((task) => {
      if (isTaskBlocked({ task, tasks: allTasks })) {
        blocked.add(task.id);
      }
    });

    return blocked;
  }, [allTasks, tasks]);

  const handleSkipClick = useCallback(
    (skipParams: { id: string }) => {
      skipTask.mutate({ id: skipParams.id });
    },
    [skipTask],
  );

  const handleRemoveClick = useCallback(
    (removeParams: { id: string }) => {
      removeTask.mutate({ id: removeParams.id });
    },
    [removeTask],
  );

  const handleStartPipelineClick = useCallback(() => {
    startPipeline.mutate(
      { companyId: params.companyId },
      {
        onSuccess: () => {
          toast.success("Воронка запущена");
        },
      },
    );
  }, [params.companyId, startPipeline]);

  return {
    blockedTaskIds,
    handleRemoveClick,
    handleSkipClick,
    handleStartPipelineClick,
    hasPipeline: tasks.some((task) => task.kind === "stage"),
    isLoading: tasksQuery.isLoading,
    tasks,
  };
};
