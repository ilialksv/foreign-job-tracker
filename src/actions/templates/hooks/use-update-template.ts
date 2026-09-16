import { useMutation, useQueryClient } from "@tanstack/react-query";

import { templatesRepository } from "@/lib/storage/repositories";
import type { UpdateInput } from "@/lib/storage/types";
import type { Template } from "@/shared/types/entities";

import { templatesQueryKeys } from "../constants/query-keys";

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; data: UpdateInput<Template> }) =>
      templatesRepository.update({ id: params.id, data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templatesQueryKeys.root });
    },
  });
};
