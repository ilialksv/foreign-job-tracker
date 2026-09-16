import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateInput } from "@/lib/storage/types";
import { tasksRepository } from "@/lib/storage/repositories";
import type { Task } from "@/shared/types/entities";

import { tasksQueryKeys } from "../constants/query-keys";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { data: CreateInput<Task> }) =>
      tasksRepository.create({ data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKeys.root });
    },
  });
};
