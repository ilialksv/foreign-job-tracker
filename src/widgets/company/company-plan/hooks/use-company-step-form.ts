import { toast } from "sonner";

import { useAddStepTask } from "@/actions/pipeline/hooks/use-add-step-task";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import { COMPANY_STEP_FORM_DEFAULT_VALUES } from "../schemas/company-step-form-schema";
import { companyStepFormValidateFn } from "../utils/company-plan-form-helpers";

export const useCompanyStepForm = (params: { companyId: string }) => {
  const addStepTask = useAddStepTask();

  const form = useAppForm({
    defaultValues: COMPANY_STEP_FORM_DEFAULT_VALUES,
    validators: {
      onChange: companyStepFormValidateFn,
      onSubmit: companyStepFormValidateFn,
    },
    onSubmit: ({ value, formApi }) => {
      addStepTask.mutate(
        { companyId: params.companyId, stepKey: value.stepKey },
        {
          onSuccess: () => {
            formApi.reset();
            toast.success("Шаг добавлен");
          },
          onError: () => {
            toast.error("Не получилось добавить шаг");
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return { form, isPending: addStepTask.isPending, onFormSubmit };
};
