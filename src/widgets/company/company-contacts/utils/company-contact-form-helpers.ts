import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { companyContactFormSchema } from "../schemas/company-contact-form-schema";

export const companyContactFormValidateFn = createFormValidateFn(
  companyContactFormSchema,
);
