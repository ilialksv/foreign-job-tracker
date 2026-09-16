import { toast } from "sonner";

import { useCreateTask } from "@/actions/tasks/hooks/use-create-task";
import { buildCustomTask } from "@/lib/pipeline";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { fromDateInputValue } from "@/shared/utils/dates";

import { COMPANY_TASK_FORM_DEFAULT_VALUES } from "../schemas/company-task-form-schema";
import { companyTaskFormValidateFn } from "../utils/company-plan-form-helpers";

export const useCompanyTaskForm = (params: { companyId: string }) => {
  const createTask = useCreateTask();

  const form = useAppForm({
    defaultValues: COMPANY_TASK_FORM_DEFAULT_VALUES,
    validators: {
      onChange: companyTaskFormValidateFn,
      onSubmit: companyTaskFormValidateFn,
    },
    onSubmit: ({ value, formApi }) => {
      createTask.mutate(
        {
          data: buildCustomTask({
            companyId: params.companyId,
            title: value.title.trim(),
            description: null,
            dueAt: fromDateInputValue(value.dueAt),
          }),
        },
        {
          onSuccess: () => {
            formApi.reset();
            toast.success("Задача добавлена");
          },
          onError: () => {
            toast.error("Не получилось добавить задачу");
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return { form, isPending: createTask.isPending, onFormSubmit };
};
