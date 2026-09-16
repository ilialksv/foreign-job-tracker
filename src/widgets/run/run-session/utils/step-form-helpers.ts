import type { StepDefinition } from "@/lib/pipeline";
import { createFormValidateFn } from "@/lib/tanstack-form/utils/create-form-validate-fn";

import { createStepFormSchema } from "../schemas/step-form-schema";

export const createStepFormValidateFn = (params: { step: StepDefinition }) =>
  createFormValidateFn(createStepFormSchema({ step: params.step }));
