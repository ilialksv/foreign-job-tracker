import { useMemo } from "react";

import { useGetCompanies } from "@/actions/companies/hooks/use-get-companies";
import { useGetActionableTasks } from "@/actions/pipeline/hooks/use-get-actionable-tasks";
import { useGetSettings } from "@/actions/settings/hooks/use-get-settings";
import { getDaysFromToday } from "@/shared/utils/dates";

import { buildPipelineSegments } from "../utils/build-pipeline-segments";

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

  const weeklyGoal = settingsQuery.data?.goals.companiesPerWeek ?? 10;

  return {
    actionableCount: actionableTasks.length,
    isLoading: companiesQuery.isLoading,
    overdueCount,
    segments: pipeline.segments,
    total: pipeline.total,
    weeklyGoal,
  };
};
