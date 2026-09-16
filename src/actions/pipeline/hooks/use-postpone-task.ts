import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tasksRepository } from "@/lib/storage/repositories";
import { shiftDaysIso } from "@/shared/utils/dates";

import { invalidatePipelineQueries } from "../utils/invalidate-pipeline-queries";

export const usePostponeTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; days: number }) =>
      tasksRepository.update({
        id: params.id,
        data: { dueAt: shiftDaysIso({ days: params.days }) },
      }),
    onSuccess: () => {
      invalidatePipelineQueries({ queryClient });
    },
  });
};
