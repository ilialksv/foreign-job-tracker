import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidatePipelineQueries } from "@/actions/pipeline/utils/invalidate-pipeline-queries";
import { buildCustomTask } from "@/lib/pipeline";
import {
  companiesRepository,
  contactsRepository,
  tasksRepository,
} from "@/lib/storage/repositories";

import { mapCsvCompanies } from "../utils/map-csv-companies";
import { parseCsv } from "../utils/parse-csv";

export const useImportCompaniesCsv = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { content: string; countryCode: string }) => {
      const rows = parseCsv({ content: params.content });
      const drafts = mapCsvCompanies({
        rows,
        countryCode: params.countryCode,
      });

      if (drafts.length === 0) {
        throw new Error("В файле не нашлось ни одной компании");
      }

      const existing = await companiesRepository.list();
      const existingNames = new Set(
        existing.map((company) => company.name.toLowerCase()),
      );

      let created = 0;

      for (const draft of drafts) {
        if (existingNames.has(draft.company.name.toLowerCase())) {
          continue;
        }

        const company = await companiesRepository.create({
          data: draft.company,
        });

        existingNames.add(company.name.toLowerCase());
        created += 1;

        for (const contact of draft.contacts) {
          await contactsRepository.create({
            data: { ...contact, companyId: company.id },
          });
        }

        if (draft.nextContactDate) {
          await tasksRepository.create({
            data: buildCustomTask({
              companyId: company.id,
              title: "Следующий контакт",
              description: "Импортировано из CSV",
              dueAt: draft.nextContactDate,
            }),
          });
        }
      }

      return { created, total: drafts.length };
    },
    onSuccess: () => {
      invalidatePipelineQueries({ queryClient });
    },
  });
};
