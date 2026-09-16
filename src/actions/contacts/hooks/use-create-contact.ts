import { useMutation, useQueryClient } from "@tanstack/react-query";

import { contactsRepository } from "@/lib/storage/repositories";
import type { CreateInput } from "@/lib/storage/types";
import type { Contact } from "@/shared/types/entities";

import { contactsQueryKeys } from "../constants/query-keys";

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { data: CreateInput<Contact> }) =>
      contactsRepository.create({ data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactsQueryKeys.root });
    },
  });
};
