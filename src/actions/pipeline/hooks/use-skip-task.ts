import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tasksRepository } from "@/lib/storage/repositories";
import { nowIso } from "@/shared/utils/dates";

import { invalidatePipelineQueries } from "../utils/invalidate-pipeline-queries";

export const useSkipTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string }) =>
      tasksRepository.update({
        id: params.id,
        data: { status: "skipped", completedAt: nowIso() },
      }),
    onSuccess: () => {
      invalidatePipelineQueries({ queryClient });
    },
  });
};
