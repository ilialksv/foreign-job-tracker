import { useMutation, useQueryClient } from "@tanstack/react-query";

import { templatesRepository } from "@/lib/storage/repositories";

import { templatesQueryKeys } from "../constants/query-keys";

export const useRemoveTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string }) =>
      templatesRepository.remove({ id: params.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templatesQueryKeys.root });
    },
  });
};
