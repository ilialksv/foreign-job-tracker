import { useMutation, useQueryClient } from "@tanstack/react-query";

import { buildStepTask } from "@/lib/pipeline";
import { tasksRepository } from "@/lib/storage/repositories";
import { todayIso } from "@/shared/utils/dates";

import { invalidatePipelineQueries } from "../utils/invalidate-pipeline-queries";

export const useAddStepTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { companyId: string; stepKey: string }) => {
      const draft = buildStepTask({
        companyId: params.companyId,
        stepKey: params.stepKey,
        dueAt: todayIso(),
      });

      if (!draft) {
        throw new Error("Шаг не найден");
      }

      await tasksRepository.create({ data: draft });
    },
    onSuccess: () => {
      invalidatePipelineQueries({ queryClient });
    },
  });
};
