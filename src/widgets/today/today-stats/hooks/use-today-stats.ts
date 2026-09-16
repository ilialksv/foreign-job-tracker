import { useMemo } from "react";

import { useGetCompanies } from "@/actions/companies/hooks/use-get-companies";
import { useGetTasks } from "@/actions/tasks/hooks/use-get-tasks";
import { getActionableTasks } from "@/lib/pipeline";
import type { CompanyStatus } from "@/shared/types/entities";

const countByStatus = (params: {
  statuses: CompanyStatus[];
  companies: { status: CompanyStatus; archivedAt: string | null }[];
}) =>
  params.companies.filter(
    (company) =>
      company.archivedAt === null && params.statuses.includes(company.status),
  ).length;

export const useTodayStats = () => {
  const companiesQuery = useGetCompanies();
  const tasksQuery = useGetTasks();

  return useMemo(() => {
    const companies = companiesQuery.data ?? [];
    const tasks = tasksQuery.data ?? [];

    return {
      isLoading: companiesQuery.isLoading || tasksQuery.isLoading,
      queued: countByStatus({ statuses: ["queued"], companies }),
      active: countByStatus({ statuses: ["active"], companies }),
      waiting: countByStatus({ statuses: ["waiting"], companies }),
      responded: countByStatus({
        statuses: ["responded", "interviewing", "offer"],
        companies,
      }),
      actionable: getActionableTasks({ tasks, companies }).length,
    };
  }, [
    companiesQuery.data,
    companiesQuery.isLoading,
    tasksQuery.data,
    tasksQuery.isLoading,
  ]);
};
