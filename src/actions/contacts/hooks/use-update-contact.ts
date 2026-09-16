import { useMutation, useQueryClient } from "@tanstack/react-query";

import { contactsRepository } from "@/lib/storage/repositories";
import type { UpdateInput } from "@/lib/storage/types";
import type { Contact } from "@/shared/types/entities";

import { contactsQueryKeys } from "../constants/query-keys";

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; data: UpdateInput<Contact> }) =>
      contactsRepository.update({ id: params.id, data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactsQueryKeys.root });
    },
  });
};
