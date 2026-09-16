import { z } from "@/lib/zod";
import { requiredTextSchema } from "@/lib/zod/schemas/common";

export const companyNoteFormSchema = z.object({
  body: requiredTextSchema({
    min: 3,
    max: 4000,
    message: "Заметка не может быть пустой",
  }),
});

export type CompanyNoteFormValues = z.infer<typeof companyNoteFormSchema>;

export const COMPANY_NOTE_FORM_DEFAULT_VALUES: CompanyNoteFormValues = {
  body: "",
};
