import { createFormMatchValidateFn } from "@/lib/tanstack-form/utils/create-form-match-validate-fn";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { settingsProfileFormSchema } from "../schemas/settings-profile-form-schema";

export const settingsProfileFormValidateFn = createFormValidateFn(
  settingsProfileFormSchema,
);

export const settingsProfileFormMatchValidateFn = createFormMatchValidateFn(
  settingsProfileFormSchema,
);
