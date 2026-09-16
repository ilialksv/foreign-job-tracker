import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useGetContacts } from "@/actions/contacts/hooks/use-get-contacts";
import { useCompleteTask } from "@/actions/pipeline/hooks/use-complete-task";
import { useGetActionableTasks } from "@/actions/pipeline/hooks/use-get-actionable-tasks";
import { usePostponeTask } from "@/actions/pipeline/hooks/use-postpone-task";
import { useReopenTask } from "@/actions/pipeline/hooks/use-reopen-task";
import { useSkipTask } from "@/actions/pipeline/hooks/use-skip-task";
import { useStartPipeline } from "@/actions/pipeline/hooks/use-start-pipeline";
import { useUpdateTaskAnswers } from "@/actions/pipeline/hooks/use-update-task-answers";
import { useGetSettings } from "@/actions/settings/hooks/use-get-settings";
import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";
import { useGetVacancies } from "@/actions/vacancies/hooks/use-get-vacancies";
import type { StepOption } from "@/lib/pipeline";
import { getStepDefinition } from "@/lib/pipeline";
import type { TaskAnswers } from "@/shared/types/entities";
import { copyText } from "@/shared/utils/copy-text";
import { formatDateTime, formatRelativeDay } from "@/shared/utils/dates";
import { fillTemplate } from "@/shared/utils/fill-template";

import {
  getBlockingTaskTitles,
  getNavigationTasks,
  getTaskMode,
} from "../utils/get-navigation-tasks";
import {
  getStepContact,
  getTemplateVariables,
} from "../utils/get-template-variables";

export const useRunSession = (params: {
  companyId?: string;
  /** Выбранный шаг, когда страница управляется маршрутом. */
  taskId?: string;
  onSelectTask?: (selectParams: { id: string }) => void;
  onAfterComplete?: (completeParams: { nextTaskId: string | null }) => void;
}) => {
  const [localSelectedTaskId, setLocalSelectedTaskId] = useState<string | null>(
    null,
  );

  const isRouteControlled = Boolean(params.onSelectTask);
  const selectedTaskId = isRouteControlled
    ? (params.taskId ?? null)
    : localSelectedTaskId;

  const { actionableTasks, companies, tasks, isLoading } =
    useGetActionableTasks({ companyId: params.companyId });
  const contactsQuery = useGetContacts();
  const vacanciesQuery = useGetVacancies();
  const templatesQuery = useGetTemplates();
  const settingsQuery = useGetSettings();

  const completeTask = useCompleteTask();
  const updateTaskAnswers = useUpdateTaskAnswers();
  const reopenTask = useReopenTask();
  const postponeTask = usePostponeTask();
  const skipTask = useSkipTask();
  const startPipeline = useStartPipeline();

  const navigationItems = useMemo(
    () =>
      getNavigationTasks({
        tasks,
        actionableTasks,
        companyId: params.companyId,
      }),
    [actionableTasks, params.companyId, tasks],
  );

  const selectableItems = useMemo(
    () => navigationItems.filter((item) => item.isSelectable),
    [navigationItems],
  );

  const currentTask = useMemo(() => {
    if (selectedTaskId) {
      const selected = navigationItems.find(
        (item) => item.task.id === selectedTaskId,
      );

      if (selected) {
        return selected.task;
      }
    }

    if (actionableTasks.length > 0) {
      return actionableTasks[0];
    }

    return selectableItems[selectableItems.length - 1]?.task ?? null;
  }, [actionableTasks, navigationItems, selectableItems, selectedTaskId]);

  const currentMode = useMemo(() => {
    if (!currentTask) {
      return null;
    }

    return getTaskMode({ task: currentTask, tasks });
  }, [currentTask, tasks]);

  const currentIndex = useMemo(
    () => selectableItems.findIndex((item) => item.task.id === currentTask?.id),
    [currentTask, selectableItems],
  );

  const blockedByTitles = useMemo(() => {
    if (!currentTask || currentMode !== "blocked") {
      return [];
    }

    return getBlockingTaskTitles({ task: currentTask, tasks });
  }, [currentMode, currentTask, tasks]);

  const nextTaskId = useMemo(() => {
    const currentPosition = navigationItems.findIndex(
      (item) => item.task.id === currentTask?.id,
    );
    const openItems = navigationItems.filter(
      (item) => item.mode !== "completed" && item.task.id !== currentTask?.id,
    );
    const nextItem =
      navigationItems
        .slice(currentPosition + 1)
        .find(
          (item) =>
            item.mode !== "completed" && item.task.id !== currentTask?.id,
        ) ?? openItems[0];

    return nextItem?.task.id ?? null;
  }, [currentTask, navigationItems]);

  const company = useMemo(() => {
    if (!currentTask?.companyId) {
      return null;
    }

    return companies.find((item) => item.id === currentTask.companyId) ?? null;
  }, [companies, currentTask]);

  const step = useMemo(
    () => getStepDefinition({ stepKey: currentTask?.stepKey ?? null }),
    [currentTask],
  );

  const isCompleted = currentMode === "completed";
  const isBlocked = currentMode === "blocked";

  const stateLabel = useMemo(() => {
    if (!currentTask) {
      return "";
    }

    if (isBlocked) {
      return blockedByTitles.length > 0
        ? `ждёт: ${blockedByTitles.join(", ")}`
        : "шаг недоступен";
    }

    if (isCompleted) {
      const prefix = currentTask.status === "skipped" ? "пропущен" : "закрыт";

      return currentTask.completedAt
        ? `${prefix} ${formatDateTime(currentTask.completedAt)}`
        : prefix;
    }

    return formatRelativeDay(currentTask.dueAt);
  }, [blockedByTitles, currentTask, isBlocked, isCompleted]);

  const nextQueuedCompany = useMemo(() => {
    if (params.companyId) {
      return (
        companies.find(
          (item) => item.id === params.companyId && item.status === "queued",
        ) ?? null
      );
    }

    return (
      companies.find(
        (item) => item.status === "queued" && item.archivedAt === null,
      ) ?? null
    );
  }, [companies, params.companyId]);

  const templateText = useMemo(() => {
    if (!step?.templateScenario || !company) {
      return null;
    }

    const contacts = contactsQuery.data ?? [];
    const contact = getStepContact({ step, contacts, companyId: company.id });
    const language = contact?.language ?? "en";
    const templates = templatesQuery.data ?? [];
    const matching =
      templates.find(
        (template) =>
          template.scenario === step.templateScenario &&
          template.lang === language,
      ) ??
      templates.find(
        (template) => template.scenario === step.templateScenario,
      ) ??
      null;

    if (!matching) {
      return null;
    }

    return fillTemplate({
      body: matching.body,
      variables: getTemplateVariables({
        company,
        companyTasks: tasks.filter((item) => item.companyId === company.id),
        contact,
        vacancies: vacanciesQuery.data ?? [],
        settings: settingsQuery.data,
      }),
    });
  }, [
    company,
    contactsQuery.data,
    settingsQuery.data,
    step,
    tasks,
    templatesQuery.data,
    vacanciesQuery.data,
  ]);

  const handleSelectTask = useCallback(
    (selectParams: { id: string }) => {
      if (params.onSelectTask) {
        params.onSelectTask(selectParams);

        return;
      }

      setLocalSelectedTaskId(selectParams.id);
    },
    [params],
  );

  const handleAfterComplete = useCallback(() => {
    if (params.onAfterComplete) {
      params.onAfterComplete({ nextTaskId });

      return;
    }

    setLocalSelectedTaskId(null);
  }, [nextTaskId, params]);

  const handleBackClick = useCallback(() => {
    const previousItem = selectableItems[currentIndex - 1];

    if (previousItem) {
      handleSelectTask({ id: previousItem.task.id });
    }
  }, [currentIndex, handleSelectTask, selectableItems]);

  const handleForwardClick = useCallback(() => {
    const nextItem = selectableItems[currentIndex + 1];

    if (nextItem) {
      handleSelectTask({ id: nextItem.task.id });
    }
  }, [currentIndex, handleSelectTask, selectableItems]);

  const handleComplete = useCallback(
    (completeParams: { option: StepOption; answers: TaskAnswers }) => {
      if (!currentTask) {
        return;
      }

      completeTask.mutate(
        {
          task: currentTask,
          answers: completeParams.answers,
          option: completeParams.option,
        },
        {
          onSuccess: () => {
            handleAfterComplete();
            toast.success("Шаг закрыт");
          },
          onError: () => {
            toast.error("Не получилось закрыть шаг");
          },
        },
      );
    },
    [completeTask, currentTask, handleAfterComplete],
  );

  const handleSaveAnswers = useCallback(
    (saveParams: { answers: TaskAnswers }) => {
      if (!currentTask) {
        return;
      }

      updateTaskAnswers.mutate(
        { id: currentTask.id, answers: saveParams.answers },
        {
          onSuccess: () => {
            toast.success("Ответы сохранены");
          },
          onError: () => {
            toast.error("Не получилось сохранить ответы");
          },
        },
      );
    },
    [currentTask, updateTaskAnswers],
  );

  const handleReopenClick = useCallback(() => {
    if (!currentTask) {
      return;
    }

    reopenTask.mutate(
      { id: currentTask.id },
      {
        onSuccess: () => {
          toast.success("Шаг вернулся в работу");
        },
      },
    );
  }, [currentTask, reopenTask]);

  const handleCustomDoneClick = useCallback(() => {
    if (!currentTask) {
      return;
    }

    completeTask.mutate(
      { task: currentTask, answers: {}, option: null },
      {
        onSuccess: () => {
          handleAfterComplete();
          toast.success("Задача закрыта");
        },
      },
    );
  }, [completeTask, currentTask, handleAfterComplete]);

  const handlePostponeClick = useCallback(
    (postponeParams: { days: number }) => {
      if (!currentTask) {
        return;
      }

      postponeTask.mutate(
        { id: currentTask.id, days: postponeParams.days },
        {
          onSuccess: () => {
            handleAfterComplete();
            toast.success(`Отложено на ${postponeParams.days} дн.`);
          },
        },
      );
    },
    [currentTask, handleAfterComplete, postponeTask],
  );

  const handleSkipClick = useCallback(() => {
    if (!currentTask) {
      return;
    }

    skipTask.mutate(
      { id: currentTask.id },
      {
        onSuccess: () => {
          handleAfterComplete();
          toast.success("Шаг пропущен");
        },
      },
    );
  }, [currentTask, handleAfterComplete, skipTask]);

  const handleStartNextCompanyClick = useCallback(() => {
    if (!nextQueuedCompany) {
      return;
    }

    startPipeline.mutate(
      { companyId: nextQueuedCompany.id },
      {
        onSuccess: () => {
          toast.success(`${nextQueuedCompany.name}: воронка запущена`);
        },
      },
    );
  }, [nextQueuedCompany, startPipeline]);

  const handleCopyTemplateClick = useCallback(async () => {
    if (!templateText) {
      return;
    }

    const copied = await copyText(templateText);

    if (copied) {
      toast.success("Текст скопирован");
    }
  }, [templateText]);

  return {
    blockedByTitles,
    canGoBack: currentIndex > 0,
    isBlocked,
    isCompleted,
    stateLabel,
    canGoForward:
      currentIndex >= 0 && currentIndex < selectableItems.length - 1,
    company,
    currentMode,
    currentTask,
    handleBackClick,
    handleComplete,
    handleCopyTemplateClick,
    handleCustomDoneClick,
    handleForwardClick,
    handlePostponeClick,
    handleReopenClick,
    handleSaveAnswers,
    handleSelectTask,
    handleSkipClick,
    handleStartNextCompanyClick,
    isLoading,
    isMutating:
      completeTask.isPending ||
      skipTask.isPending ||
      reopenTask.isPending ||
      updateTaskAnswers.isPending,
    navigationItems,
    nextQueuedCompany,
    remainingCount: actionableTasks.length,
    step,
    templateText,
  };
};
