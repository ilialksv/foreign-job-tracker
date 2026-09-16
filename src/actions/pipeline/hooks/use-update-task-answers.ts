import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tasksRepository } from "@/lib/storage/repositories";
import type { TaskAnswers } from "@/shared/types/entities";

import { invalidatePipelineQueries } from "../utils/invalidate-pipeline-queries";

/** Правка ответов уже закрытого шага: эффекты исхода повторно не применяются. */
export const useUpdateTaskAnswers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; answers: TaskAnswers }) =>
      tasksRepository.update({
        id: params.id,
        data: { answers: params.answers },
      }),
    onSuccess: () => {
      invalidatePipelineQueries({ queryClient });
    },
  });
};
