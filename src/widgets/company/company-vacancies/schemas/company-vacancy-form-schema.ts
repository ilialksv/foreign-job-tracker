import { z } from "@/lib/zod";
import {
  optionalUrlSchema,
  requiredEnumSchema,
  requiredTextSchema,
} from "@/lib/zod/schemas/common";
import { VACANCY_SOURCE_ORDER } from "@/shared/constants/vacancies";

export const companyVacancyFormSchema = z.object({
  title: requiredTextSchema({
    min: 3,
    max: 160,
    message: "Название вакансии обязательно",
  }),
  url: optionalUrlSchema(),
  source: requiredEnumSchema({
    values: VACANCY_SOURCE_ORDER,
    message: "Выберите источник",
  }),
});

export type CompanyVacancyFormValues = z.infer<typeof companyVacancyFormSchema>;

export const COMPANY_VACANCY_FORM_DEFAULT_VALUES: CompanyVacancyFormValues = {
  title: "",
  url: "",
  source: "careers",
};
