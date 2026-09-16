import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { companyNoteFormSchema } from "../schemas/company-note-form-schema";

export const companyNoteFormValidateFn = createFormValidateFn(
  companyNoteFormSchema,
);
