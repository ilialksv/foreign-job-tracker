import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tasksRepository } from "@/lib/storage/repositories";

import { invalidatePipelineQueries } from "../utils/invalidate-pipeline-queries";

/**
 * Возвращает закрытый шаг в работу. Эффекты прошлого исхода не откатываются:
 * повторное закрытие применит эффекты нового исхода поверх.
 */
export const useReopenTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string }) =>
      tasksRepository.update({
        id: params.id,
        data: { status: "todo", outcome: null, completedAt: null },
      }),
    onSuccess: () => {
      invalidatePipelineQueries({ queryClient });
    },
  });
};
