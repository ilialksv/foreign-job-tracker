import type { Company, Task } from "@/shared/types/entities";
import { isDue } from "@/shared/utils/dates";

export const OPEN_TASK_STATUSES = ["todo", "in_progress"] as const;

export const isTaskOpen = (params: { task: Task }) =>
  params.task.status === "todo" || params.task.status === "in_progress";

export const isTaskBlocked = (params: { task: Task; tasks: Task[] }) => {
  if (params.task.dependsOn.length === 0) {
    return false;
  }

  return params.task.dependsOn.some((dependencyId) => {
    const dependency = params.tasks.find((item) => item.id === dependencyId);

    if (!dependency) {
      return false;
    }

    return isTaskOpen({ task: dependency });
  });
};

export const isTaskActionable = (params: { task: Task; tasks: Task[] }) => {
  if (!isTaskOpen({ task: params.task })) {
    return false;
  }

  if (isTaskBlocked({ task: params.task, tasks: params.tasks })) {
    return false;
  }

  return params.task.dueAt === null || isDue(params.task.dueAt);
};

const DEPTH_WEIGHT: Record<Company["depth"], number> = {
  deep: 0,
  standard: 1,
  quick: 2,
};

export const sortActionableTasks = (params: {
  tasks: Task[];
  companies: Company[];
}) => {
  const companyById = new Map(
    params.companies.map((company) => [company.id, company]),
  );

  return [...params.tasks].sort((left, right) => {
    if (left.dueAt && right.dueAt && left.dueAt !== right.dueAt) {
      return left.dueAt < right.dueAt ? -1 : 1;
    }

    if (left.dueAt && !right.dueAt) {
      return -1;
    }

    if (!left.dueAt && right.dueAt) {
      return 1;
    }

    const leftCompany = left.companyId
      ? companyById.get(left.companyId)
      : undefined;
    const rightCompany = right.companyId
      ? companyById.get(right.companyId)
      : undefined;
    const leftWeight = leftCompany ? DEPTH_WEIGHT[leftCompany.depth] : -1;
    const rightWeight = rightCompany ? DEPTH_WEIGHT[rightCompany.depth] : -1;

    if (leftWeight !== rightWeight) {
      return leftWeight - rightWeight;
    }

    return left.order - right.order;
  });
};

export const getActionableTasks = (params: {
  tasks: Task[];
  companies: Company[];
}) => {
  const companyById = new Map(
    params.companies.map((company) => [company.id, company]),
  );

  const actionable = params.tasks.filter((task) => {
    if (!isTaskActionable({ task, tasks: params.tasks })) {
      return false;
    }

    if (!task.companyId) {
      return true;
    }

    const company = companyById.get(task.companyId);

    if (!company) {
      return false;
    }

    return company.archivedAt === null && company.status !== "excluded";
  });

  return sortActionableTasks({
    tasks: actionable,
    companies: params.companies,
  });
};

export const getUpcomingTasks = (params: {
  tasks: Task[];
  companies: Company[];
}) => {
  const scheduled = params.tasks.filter(
    (task) => isTaskOpen({ task }) && task.dueAt !== null,
  );

  return sortActionableTasks({ tasks: scheduled, companies: params.companies });
};
