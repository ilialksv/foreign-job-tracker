import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { templateFormSchema } from "../schemas/template-form-schema";

export const templateFormValidateFn = createFormValidateFn(templateFormSchema);

export const templateFormMatchValidateFn =
  createFormMatchValidateFn(templateFormSchema);
