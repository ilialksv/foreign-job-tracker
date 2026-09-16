import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { companyFormSchema } from "../schemas/company-form-schema";

export const companyFormValidateFn = createFormValidateFn(companyFormSchema);

export const companyFormMatchValidateFn =
  createFormMatchValidateFn(companyFormSchema);
