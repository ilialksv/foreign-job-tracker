import { z } from "@/lib/zod";
import {
  optionalDateSchema,
  requiredTextSchema,
} from "@/lib/zod/schemas/common";

export const companyTaskFormSchema = z.object({
  title: requiredTextSchema({
    min: 3,
    max: 160,
    message: "Название задачи обязательно",
  }),
  dueAt: optionalDateSchema(),
});

export type CompanyTaskFormValues = z.infer<typeof companyTaskFormSchema>;

export const COMPANY_TASK_FORM_DEFAULT_VALUES: CompanyTaskFormValues = {
  title: "",
  dueAt: "",
};
