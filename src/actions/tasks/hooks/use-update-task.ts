import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tasksRepository } from "@/lib/storage/repositories";
import type { UpdateInput } from "@/lib/storage/types";
import type { Task } from "@/shared/types/entities";

import { tasksQueryKeys } from "../constants/query-keys";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; data: UpdateInput<Task> }) =>
      tasksRepository.update({ id: params.id, data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKeys.root });
    },
  });
};
