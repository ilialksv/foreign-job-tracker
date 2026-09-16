import { isTaskBlocked, isTaskOpen } from "@/lib/pipeline";
import type { Task } from "@/shared/types/entities";

export type RunSessionMode = "active" | "completed" | "blocked";

export type NavigationTask = {
  task: Task;
  mode: RunSessionMode;
  isSelectable: boolean;
  /** Названия незакрытых шагов, из-за которых этот недоступен. */
  blockedBy: string[];
};

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

/**
 * Лента шагов для навигации. По компании — все её шаги по порядку,
 * в общем режиме — только то, что можно делать прямо сейчас.
 */
export const getNavigationTasks = (params: {
  tasks: Task[];
  actionableTasks: Task[];
  companyId?: string;
}): NavigationTask[] => {
  if (!params.companyId) {
    return params.actionableTasks.map((task) => ({
      task,
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
        mode,
        isSelectable: mode !== "blocked",
        blockedBy:
          mode === "blocked"
            ? getBlockingTaskTitles({ task, tasks: params.tasks })
            : [],
      };
    });
};
