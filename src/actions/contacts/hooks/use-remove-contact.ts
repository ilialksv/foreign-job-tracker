import { useMutation, useQueryClient } from "@tanstack/react-query";

import { contactsRepository } from "@/lib/storage/repositories";

import { contactsQueryKeys } from "../constants/query-keys";

export const useRemoveContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string }) =>
      contactsRepository.remove({ id: params.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactsQueryKeys.root });
    },
  });
};
