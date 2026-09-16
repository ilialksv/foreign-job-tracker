import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { companyStepFormSchema } from "../schemas/company-step-form-schema";
import { companyTaskFormSchema } from "../schemas/company-task-form-schema";

export const companyTaskFormValidateFn = createFormValidateFn(
  companyTaskFormSchema,
);

export const companyStepFormValidateFn = createFormValidateFn(
  companyStepFormSchema,
);
