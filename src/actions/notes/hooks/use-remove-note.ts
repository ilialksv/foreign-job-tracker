import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notesRepository } from "@/lib/storage/repositories";

import { notesQueryKeys } from "../constants/query-keys";

export const useRemoveNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string }) =>
      notesRepository.remove({ id: params.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesQueryKeys.root });
    },
  });
};
