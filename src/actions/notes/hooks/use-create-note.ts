import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateInput } from "@/lib/storage/types";
import { notesRepository } from "@/lib/storage/repositories";
import type { Note } from "@/shared/types/entities";

import { notesQueryKeys } from "../constants/query-keys";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { data: CreateInput<Note> }) =>
      notesRepository.create({ data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesQueryKeys.root });
    },
  });
};
