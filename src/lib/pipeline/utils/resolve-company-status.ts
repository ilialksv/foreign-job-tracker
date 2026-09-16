import type { Company, CompanyStatus, Task } from "@/shared/types/entities";

import { isTaskActionable, isTaskOpen } from "./task-state";

export const TERMINAL_COMPANY_STATUSES: CompanyStatus[] = [
  "responded",
  "interviewing",
  "offer",
  "rejected",
  "dormant",
  "excluded",
];

export const isTerminalStatus = (params: { status: CompanyStatus }) =>
  TERMINAL_COMPANY_STATUSES.includes(params.status);

export const resolveCompanyStatus = (params: {
  company: Company;
  tasks: Task[];
}): CompanyStatus => {
  if (isTerminalStatus({ status: params.company.status })) {
    return params.company.status;
  }

  const companyTasks = params.tasks.filter(
    (task) => task.companyId === params.company.id,
  );

  if (companyTasks.length === 0) {
    return "queued";
  }

  const hasOpenTasks = companyTasks.some((task) => isTaskOpen({ task }));

  if (!hasOpenTasks) {
    return "waiting";
  }

  const hasActionableTasks = companyTasks.some((task) =>
    isTaskActionable({ task, tasks: params.tasks }),
  );

  return hasActionableTasks ? "active" : "waiting";
};
