import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { StepOption } from "@/lib/pipeline";
import { applyOutcome, getStepDefinition } from "@/lib/pipeline";
import {
  companiesRepository,
  contactsRepository,
  tasksRepository,
} from "@/lib/storage/repositories";
import type { Task, TaskAnswers } from "@/shared/types/entities";
import { nowIso } from "@/shared/utils/dates";

import { applyPipelinePatch } from "../utils/apply-pipeline-patch";
import { invalidatePipelineQueries } from "../utils/invalidate-pipeline-queries";
import { syncReconContacts } from "../utils/sync-recon-contacts";

export type CompleteTaskParams = {
  task: Task;
  answers: TaskAnswers;
  option: StepOption | null;
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CompleteTaskParams) => {
      const step = getStepDefinition({ stepKey: params.task.stepKey });

      if (!params.task.companyId || !step || !params.option) {
        await tasksRepository.update({
          id: params.task.id,
          data: {
            status: "done",
            answers: params.answers,
            completedAt: nowIso(),
          },
        });

        return;
      }

      const company = await companiesRepository.getById({
        id: params.task.companyId,
      });

      if (!company) {
        throw new Error("Компания не найдена");
      }

      if (step.key === "recon") {
        const contacts = await contactsRepository.list();

        await syncReconContacts({
          companyId: company.id,
          answers: params.answers,
          contacts,
        });
      }

      const tasks = await tasksRepository.list();
      const patch = applyOutcome({
        step,
        option: params.option,
        task: params.task,
        company,
        tasks,
        answers: params.answers,
      });

      await applyPipelinePatch({ patch, company, answers: params.answers });
    },
    onSuccess: () => {
      invalidatePipelineQueries({ queryClient });
    },
  });
};
