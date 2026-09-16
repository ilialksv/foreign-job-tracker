import { useMutation, useQueryClient } from "@tanstack/react-query";

import { settingsRepository } from "@/lib/storage/repositories";
import type { UpdateInput } from "@/lib/storage/types";
import type { Settings } from "@/shared/types/entities";

import { settingsQueryKeys } from "../constants/query-keys";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { data: UpdateInput<Settings> }) =>
      settingsRepository.update({ data: params.data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.root });
    },
  });
};
