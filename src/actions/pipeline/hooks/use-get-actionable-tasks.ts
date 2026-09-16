import { useMemo } from "react";

import { useGetCompanies } from "@/actions/companies/hooks/use-get-companies";
import { useGetTasks } from "@/actions/tasks/hooks/use-get-tasks";
import { getActionableTasks, getUpcomingTasks } from "@/lib/pipeline";

export const useGetActionableTasks = (params?: { companyId?: string }) => {
  const companiesQuery = useGetCompanies();
  const tasksQuery = useGetTasks();

  const companies = useMemo(
    () => companiesQuery.data ?? [],
    [companiesQuery.data],
  );
  const tasks = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data]);

  const actionableTasks = useMemo(() => {
    const actionable = getActionableTasks({ tasks, companies });

    if (!params?.companyId) {
      return actionable;
    }

    return actionable.filter((task) => task.companyId === params.companyId);
  }, [companies, params?.companyId, tasks]);

  const upcomingTasks = useMemo(
    () => getUpcomingTasks({ tasks, companies }),
    [companies, tasks],
  );

  return {
    actionableTasks,
    upcomingTasks,
    companies,
    tasks,
    isLoading: companiesQuery.isLoading || tasksQuery.isLoading,
    isError: companiesQuery.isError || tasksQuery.isError,
  };
};
