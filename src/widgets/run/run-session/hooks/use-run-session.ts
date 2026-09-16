import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useGetContacts } from "@/actions/contacts/hooks/use-get-contacts";
import { useCompleteTask } from "@/actions/pipeline/hooks/use-complete-task";
import { useGetActionableTasks } from "@/actions/pipeline/hooks/use-get-actionable-tasks";
import { usePostponeTask } from "@/actions/pipeline/hooks/use-postpone-task";
import { useSkipTask } from "@/actions/pipeline/hooks/use-skip-task";
import { useStartPipeline } from "@/actions/pipeline/hooks/use-start-pipeline";
import { useGetSettings } from "@/actions/settings/hooks/use-get-settings";
import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";
import { useGetVacancies } from "@/actions/vacancies/hooks/use-get-vacancies";
import type { StepOption } from "@/lib/pipeline";
import { getStepDefinition } from "@/lib/pipeline";
import type { TaskAnswerValue, TaskAnswers } from "@/shared/types/entities";
import { copyText } from "@/shared/utils/copy-text";
import { fillTemplate } from "@/shared/utils/fill-template";

import {
  getStepContact,
  getTemplateVariables,
} from "../utils/get-template-variables";

export const useRunSession = (params: { companyId?: string }) => {
  const [answers, setAnswers] = useState<TaskAnswers>({});

  const { actionableTasks, companies, tasks, isLoading } =
    useGetActionableTasks({ companyId: params.companyId });
  const contactsQuery = useGetContacts();
  const vacanciesQuery = useGetVacancies();
  const templatesQuery = useGetTemplates();
  const settingsQuery = useGetSettings();

  const completeTask = useCompleteTask();
  const postponeTask = usePostponeTask();
  const skipTask = useSkipTask();
  const startPipeline = useStartPipeline();

  const currentTask = actionableTasks[0] ?? null;

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
    const contact = getStepContact({
      step,
      contacts,
      companyId: company.id,
    });
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

  const handleAnswerChange = useCallback(
    (changeParams: { key: string; value: TaskAnswerValue }) => {
      setAnswers((previous) => ({
        ...previous,
        [changeParams.key]: changeParams.value,
      }));
    },
    [],
  );

  const handleOptionClick = useCallback(
    (option: StepOption) => {
      if (!currentTask) {
        return;
      }

      completeTask.mutate(
        { task: currentTask, answers, option },
        {
          onSuccess: () => {
            setAnswers({});
            toast.success("Шаг закрыт");
          },
          onError: () => {
            toast.error("Не получилось закрыть шаг");
          },
        },
      );
    },
    [answers, completeTask, currentTask],
  );

  const handleCustomDone = useCallback(() => {
    if (!currentTask) {
      return;
    }

    completeTask.mutate(
      { task: currentTask, answers, option: null },
      {
        onSuccess: () => {
          setAnswers({});
          toast.success("Задача закрыта");
        },
      },
    );
  }, [answers, completeTask, currentTask]);

  const handlePostponeClick = useCallback(
    (postponeParams: { days: number }) => {
      if (!currentTask) {
        return;
      }

      postponeTask.mutate(
        { id: currentTask.id, days: postponeParams.days },
        {
          onSuccess: () => {
            setAnswers({});
            toast.success(`Отложено на ${postponeParams.days} дн.`);
          },
        },
      );
    },
    [currentTask, postponeTask],
  );

  const handleSkipClick = useCallback(() => {
    if (!currentTask) {
      return;
    }

    skipTask.mutate(
      { id: currentTask.id },
      {
        onSuccess: () => {
          setAnswers({});
          toast.success("Шаг пропущен");
        },
      },
    );
  }, [currentTask, skipTask]);

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
    answers,
    company,
    currentTask,
    handleAnswerChange,
    handleCopyTemplateClick,
    handleCustomDone,
    handleOptionClick,
    handlePostponeClick,
    handleSkipClick,
    handleStartNextCompanyClick,
    isLoading,
    isMutating: completeTask.isPending || skipTask.isPending,
    nextQueuedCompany,
    remainingCount: actionableTasks.length,
    step,
    templateText,
  };
};
