import { isTaskBlocked, isTaskOpen } from "@/lib/pipeline";
import type { Company, Task } from "@/shared/types/entities";

export type RunSessionMode = "active" | "completed" | "blocked";

export type NavigationTask = {
  task: Task;
  /** Главная подпись чипа: в общем режиме — компания, внутри компании — шаг. */
  label: string;
  /** Уточнение под главной подписью. Пусто, когда уточнять нечего. */
  caption: string;
  mode: RunSessionMode;
  isSelectable: boolean;
  /** Названия незакрытых шагов, из-за которых этот недоступен. */
  blockedBy: string[];
};

const GLOBAL_TASK_LABEL = "Общая задача";

export const getTaskMode = (params: {
  task: Task;
  tasks: Task[];
}): RunSessionMode => {
  if (!isTaskOpen({ task: params.task })) {
    return "completed";
  }

  return isTaskBlocked({ task: params.task, tasks: params.tasks })
    ? "blocked"
    : "active";
};

export const getBlockingTaskTitles = (params: { task: Task; tasks: Task[] }) =>
  params.task.dependsOn.reduce<string[]>((titles, dependencyId) => {
    const dependency = params.tasks.find((item) => item.id === dependencyId);

    if (!dependency || !isTaskOpen({ task: dependency })) {
      return titles;
    }

    return [...titles, dependency.title];
  }, []);

const getCompanyName = (params: { task: Task; companies: Company[] }) => {
  if (!params.task.companyId) {
    return GLOBAL_TASK_LABEL;
  }

  const company = params.companies.find(
    (item) => item.id === params.task.companyId,
  );

  return company?.name ?? GLOBAL_TASK_LABEL;
};

/**
 * Лента шагов для навигации. По компании — все её шаги по порядку,
 * в общем режиме — только то, что можно делать прямо сейчас.
 *
 * Подписи различаются по режиму: в общем списке шаги разных компаний
 * называются одинаково, поэтому первой строкой идёт компания.
 */
export const getNavigationTasks = (params: {
  tasks: Task[];
  actionableTasks: Task[];
  companies: Company[];
  companyId?: string;
}): NavigationTask[] => {
  if (!params.companyId) {
    return params.actionableTasks.map((task) => ({
      task,
      label: getCompanyName({ task, companies: params.companies }),
      caption: task.title,
      mode: "active",
      isSelectable: true,
      blockedBy: [],
    }));
  }

  return params.tasks
    .filter((task) => task.companyId === params.companyId)
    .sort((left, right) => {
      if (left.order !== right.order) {
        return left.order - right.order;
      }

      return left.createdAt < right.createdAt ? -1 : 1;
    })
    .map((task) => {
      const mode = getTaskMode({ task, tasks: params.tasks });

      return {
        task,
        label: task.title,
        caption: "",
        mode,
        isSelectable: mode !== "blocked",
        blockedBy:
          mode === "blocked"
            ? getBlockingTaskTitles({ task, tasks: params.tasks })
            : [],
      };
    });
};
