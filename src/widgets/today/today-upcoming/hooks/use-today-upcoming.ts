import { useMemo } from "react";

import { useGetActionableTasks } from "@/actions/pipeline/hooks/use-get-actionable-tasks";
import { getDaysFromToday } from "@/shared/utils/dates";

export const useTodayUpcoming = () => {
  const { upcomingTasks, companies, isLoading } = useGetActionableTasks();

  const companyNameById = useMemo(
    () => new Map(companies.map((company) => [company.id, company.name])),
    [companies],
  );

  const groups = useMemo(() => {
    const overdue = upcomingTasks.filter(
      (task) => task.dueAt !== null && getDaysFromToday(task.dueAt) < 0,
    );
    const today = upcomingTasks.filter(
      (task) => task.dueAt !== null && getDaysFromToday(task.dueAt) === 0,
    );
    const week = upcomingTasks.filter((task) => {
      if (task.dueAt === null) {
        return false;
      }

      const days = getDaysFromToday(task.dueAt);

      return days > 0 && days <= 7;
    });

    return [
      { key: "overdue", title: "Просрочено", tasks: overdue },
      { key: "today", title: "Сегодня", tasks: today },
      { key: "week", title: "Ближайшая неделя", tasks: week },
    ].filter((group) => group.tasks.length > 0);
  }, [upcomingTasks]);

  return { companyNameById, groups, isLoading };
};
