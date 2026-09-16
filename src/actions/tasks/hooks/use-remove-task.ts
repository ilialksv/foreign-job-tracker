import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tasksRepository } from "@/lib/storage/repositories";

import { tasksQueryKeys } from "../constants/query-keys";

export const useRemoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string }) =>
      tasksRepository.remove({ id: params.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKeys.root });
    },
  });
};
