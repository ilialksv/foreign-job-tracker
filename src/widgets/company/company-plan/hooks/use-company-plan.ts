import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useAddStepTask } from "@/actions/pipeline/hooks/use-add-step-task";
import { useSkipTask } from "@/actions/pipeline/hooks/use-skip-task";
import { useStartPipeline } from "@/actions/pipeline/hooks/use-start-pipeline";
import { useCreateTask } from "@/actions/tasks/hooks/use-create-task";
import { useGetTasks } from "@/actions/tasks/hooks/use-get-tasks";
import { useRemoveTask } from "@/actions/tasks/hooks/use-remove-task";
import { buildCustomTask, FLOW_STEPS, isTaskBlocked } from "@/lib/pipeline";
import { fromDateInputValue } from "@/shared/utils/dates";

type CustomTaskValues = {
  title: string;
  dueAt: string;
};

const INITIAL_VALUES: CustomTaskValues = { title: "", dueAt: "" };

export const useCompanyPlan = (params: { companyId: string }) => {
  const [values, setValues] = useState<CustomTaskValues>(INITIAL_VALUES);
  const [stepKey, setStepKey] = useState("");

  const tasksQuery = useGetTasks();
  const createTask = useCreateTask();
  const removeTask = useRemoveTask();
  const skipTask = useSkipTask();
  const addStepTask = useAddStepTask();
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

  const onDemandStepOptions = useMemo(
    () =>
      FLOW_STEPS.filter((step) => step.creation === "on_demand").map(
        (step) => ({
          value: step.key,
          label: step.title,
        }),
      ),
    [],
  );

  const handleValuesChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setValues((previous) => ({ ...previous, [name]: value }));
    },
    [],
  );

  const handleStepKeyChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setStepKey(event.target.value);
    },
    [],
  );

  const handleAddCustomTaskClick = useCallback(() => {
    if (values.title.trim().length === 0) {
      toast.error("Название задачи обязательно");

      return;
    }

    createTask.mutate(
      {
        data: buildCustomTask({
          companyId: params.companyId,
          title: values.title.trim(),
          description: null,
          dueAt: fromDateInputValue(values.dueAt),
        }),
      },
      {
        onSuccess: () => {
          setValues(INITIAL_VALUES);
          toast.success("Задача добавлена");
        },
      },
    );
  }, [createTask, params.companyId, values]);

  const handleAddStepClick = useCallback(() => {
    if (stepKey.length === 0) {
      return;
    }

    addStepTask.mutate(
      { companyId: params.companyId, stepKey },
      {
        onSuccess: () => {
          setStepKey("");
          toast.success("Шаг добавлен");
        },
      },
    );
  }, [addStepTask, params.companyId, stepKey]);

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
    handleAddCustomTaskClick,
    handleAddStepClick,
    handleRemoveClick,
    handleSkipClick,
    handleStartPipelineClick,
    handleStepKeyChange,
    handleValuesChange,
    hasPipeline: tasks.some((task) => task.kind === "stage"),
    isLoading: tasksQuery.isLoading,
    onDemandStepOptions,
    stepKey,
    tasks,
    values,
  };
};
