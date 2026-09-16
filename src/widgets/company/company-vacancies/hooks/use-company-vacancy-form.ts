import { toast } from "sonner";

import { useCreateVacancy } from "@/actions/vacancies/hooks/use-create-vacancy";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import { nowIso } from "@/shared/utils/dates";

import { COMPANY_VACANCY_FORM_DEFAULT_VALUES } from "../schemas/company-vacancy-form-schema";
import { companyVacancyFormValidateFn } from "../utils/company-vacancy-form-helpers";

export const useCompanyVacancyForm = (params: { companyId: string }) => {
  const createVacancy = useCreateVacancy();

  const form = useAppForm({
    defaultValues: COMPANY_VACANCY_FORM_DEFAULT_VALUES,
    validators: {
      onChange: companyVacancyFormValidateFn,
      onSubmit: companyVacancyFormValidateFn,
    },
    onSubmit: ({ value, formApi }) => {
      createVacancy.mutate(
        {
          data: {
            companyId: params.companyId,
            title: value.title.trim(),
            url: value.url.trim() || null,
            source: value.source,
            status: "open",
            foundAt: nowIso(),
            appliedAt: null,
          },
        },
        {
          onSuccess: () => {
            formApi.reset();
            toast.success("Вакансия добавлена");
          },
          onError: () => {
            toast.error("Не получилось добавить вакансию");
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return { form, isPending: createVacancy.isPending, onFormSubmit };
};
