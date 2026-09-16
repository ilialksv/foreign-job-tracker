import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useClearData } from "@/actions/data-transfer/hooks/use-clear-data";
import { useExportData } from "@/actions/data-transfer/hooks/use-export-data";
import { useImportCompaniesCsv } from "@/actions/data-transfer/hooks/use-import-companies-csv";
import { useImportData } from "@/actions/data-transfer/hooks/use-import-data";
import type { RestoreStrategy } from "@/lib/storage/utils/database-snapshot";

export const useSettingsData = (params: { defaultCountryCode: string }) => {
  const [strategy, setStrategy] = useState<RestoreStrategy>("merge");
  const [countryCode, setCountryCode] = useState(params.defaultCountryCode);

  const exportData = useExportData();
  const importData = useImportData();
  const importCsv = useImportCompaniesCsv();
  const clearData = useClearData();

  const handleExportClick = useCallback(() => {
    exportData.mutate(undefined, {
      onSuccess: (fileName) => {
        toast.success(`Экспортировано в ${fileName}`);
      },
    });
  }, [exportData]);

  const handleStrategyChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setStrategy(event.target.value === "replace" ? "replace" : "merge");
    },
    [],
  );

  const handleCountryChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setCountryCode(event.target.value);
    },
    [],
  );

  const handleJsonFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      const content = await file.text();

      event.target.value = "";

      importData.mutate(
        { content, strategy },
        {
          onSuccess: () => {
            toast.success("Данные импортированы");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    },
    [importData, strategy],
  );

  const handleCsvFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      const content = await file.text();

      event.target.value = "";

      importCsv.mutate(
        { content, countryCode },
        {
          onSuccess: (result) => {
            toast.success(
              `Добавлено ${result.created} из ${result.total} компаний`,
            );
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    },
    [countryCode, importCsv],
  );

  const handleClearClick = useCallback(() => {
    clearData.mutate(undefined, {
      onSuccess: () => {
        toast.success("Данные очищены");
      },
    });
  }, [clearData]);

  return {
    countryCode,
    handleClearClick,
    handleCountryChange,
    handleCsvFileChange,
    handleExportClick,
    handleJsonFileChange,
    handleStrategyChange,
    isPending:
      exportData.isPending ||
      importData.isPending ||
      importCsv.isPending ||
      clearData.isPending,
    strategy,
  };
};
