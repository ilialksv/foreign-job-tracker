import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notesRepository } from "@/lib/storage/repositories";
import type { UpdateInput } from "@/lib/storage/types";
import type { Note } from "@/shared/types/entities";

import { notesQueryKeys } from "../constants/query-keys";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; data: UpdateInput<Note> }) =>
      notesRepository.update({ id: params.id, data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesQueryKeys.root });
    },
  });
};
