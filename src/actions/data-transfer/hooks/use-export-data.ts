import { useMutation } from "@tanstack/react-query";

import { createDatabaseSnapshot } from "@/lib/storage/utils/database-snapshot";
import { downloadFile } from "@/shared/utils/download-file";

export const useExportData = () =>
  useMutation({
    mutationFn: async () => {
      const snapshot = await createDatabaseSnapshot();
      const fileName = `foreign-job-${snapshot.exportedAt.slice(0, 10)}.json`;

      downloadFile({
        content: JSON.stringify(snapshot, null, 2),
        fileName,
        mimeType: "application/json",
      });

      return fileName;
    },
  });
