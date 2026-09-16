import { useMemo } from "react";

import { useGetCompanies } from "@/actions/companies/hooks/use-get-companies";
import { useGetActionableTasks } from "@/actions/pipeline/hooks/use-get-actionable-tasks";
import { useGetSettings } from "@/actions/settings/hooks/use-get-settings";
import { getDaysFromToday, isInCurrentWeek } from "@/shared/utils/dates";

import { buildPipelineSegments } from "../utils/build-pipeline-segments";

const DEFAULT_WEEKLY_GOAL = 10;

export const useTodayPipeline = () => {
  const companiesQuery = useGetCompanies();
  const settingsQuery = useGetSettings();
  const { actionableTasks, tasks } = useGetActionableTasks();

  const pipeline = useMemo(
    () => buildPipelineSegments({ companies: companiesQuery.data ?? [] }),
    [companiesQuery.data],
  );

  const overdueCount = useMemo(
    () =>
      tasks.filter(
        (task) =>
          (task.status === "todo" || task.status === "in_progress") &&
          task.dueAt !== null &&
          getDaysFromToday(task.dueAt) < 0,
      ).length,
    [tasks],
  );

  const weeklyGoal = settingsQuery.data?.goals.companiesPerWeek ?? DEFAULT_WEEKLY_GOAL;

  /** Компания считается сделанной за неделю, если по ней закрыт хотя бы шаг. */
  const weeklyDone = useMemo(() => {
    const companyIds = tasks.reduce<Set<string>>((ids, task) => {
      if (task.companyId && isInCurrentWeek(task.completedAt)) {
        ids.add(task.companyId);
      }

      return ids;
    }, new Set());

    return companyIds.size;
  }, [tasks]);

  const weeklyFillStyle = useMemo(() => {
    const share = weeklyGoal > 0 ? Math.min(1, weeklyDone / weeklyGoal) : 0;

    return { width: `${Math.round(share * 100)}%` };
  }, [weeklyDone, weeklyGoal]);

  return {
    actionableCount: actionableTasks.length,
    isLoading: companiesQuery.isLoading,
    overdueCount,
    segments: pipeline.segments,
    total: pipeline.total,
    weeklyDone,
    weeklyFillStyle,
    weeklyGoal,
  };
};
