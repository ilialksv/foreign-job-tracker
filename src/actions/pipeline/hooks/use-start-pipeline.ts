import { useMutation, useQueryClient } from "@tanstack/react-query";

import { buildInitialTasks } from "@/lib/pipeline";
import {
  companiesRepository,
  eventsRepository,
  tasksRepository,
} from "@/lib/storage/repositories";

import { invalidatePipelineQueries } from "../utils/invalidate-pipeline-queries";

export const useStartPipeline = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { companyId: string }) => {
      const tasks = await tasksRepository.list();
      const hasStageTasks = tasks.some(
        (task) => task.companyId === params.companyId && task.kind === "stage",
      );

      if (!hasStageTasks) {
        await tasksRepository.createMany({
          items: buildInitialTasks({ companyId: params.companyId }),
        });
      }

      await companiesRepository.update({
        id: params.companyId,
        data: { status: "active" },
      });

      await eventsRepository.create({
        data: {
          companyId: params.companyId,
          type: "status_changed",
          title: "Воронка запущена",
          details: null,
        },
      });
    },
    onSuccess: () => {
      invalidatePipelineQueries({ queryClient });
    },
  });
};
