import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidatePipelineQueries } from "@/actions/pipeline/utils/invalidate-pipeline-queries";
import { settingsQueryKeys } from "@/actions/settings/constants/query-keys";
import { templatesQueryKeys } from "@/actions/templates/constants/query-keys";
import type { RestoreStrategy } from "@/lib/storage/utils/database-snapshot";
import { restoreDatabaseSnapshot } from "@/lib/storage/utils/database-snapshot";
import { parseJson } from "@/shared/utils/parse-json";

import { parseDatabaseSnapshot } from "../utils/database-snapshot-schema";

export const useImportData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      content: string;
      strategy: RestoreStrategy;
    }) => {
      const raw = parseJson<unknown>(params.content);
      const snapshot = parseDatabaseSnapshot({ raw });

      if (!snapshot) {
        throw new Error("Файл не похож на экспорт этого приложения");
      }

      await restoreDatabaseSnapshot({
        snapshot,
        strategy: params.strategy,
      });

      return snapshot;
    },
    onSuccess: () => {
      invalidatePipelineQueries({ queryClient });
      queryClient.invalidateQueries({ queryKey: templatesQueryKeys.root });
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.root });
    },
  });
};
