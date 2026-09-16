import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { companyVacancyFormSchema } from "../schemas/company-vacancy-form-schema";

export const companyVacancyFormValidateFn = createFormValidateFn(
  companyVacancyFormSchema,
);
