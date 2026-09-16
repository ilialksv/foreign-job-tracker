import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidatePipelineQueries } from "@/actions/pipeline/utils/invalidate-pipeline-queries";
import { clearDatabase } from "@/lib/storage/utils/database-snapshot";

export const useClearData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearDatabase(),
    onSuccess: () => {
      invalidatePipelineQueries({ queryClient });
    },
  });
};
