import { ON_DEMAND_STEPS } from "@/lib/pipeline";
import { z } from "@/lib/zod";
import { requiredEnumSchema } from "@/lib/zod/schemas/common";

const ON_DEMAND_STEP_KEYS = ON_DEMAND_STEPS.map((step) => step.key);

export const companyStepFormSchema = z.object({
  stepKey: requiredEnumSchema({
    values: ON_DEMAND_STEP_KEYS,
    message: "Выберите шаг",
  }),
});

export type CompanyStepFormValues = z.infer<typeof companyStepFormSchema>;

export const COMPANY_STEP_FORM_DEFAULT_VALUES: CompanyStepFormValues = {
  stepKey: "",
};
