import { z } from "@/lib/zod";
import {
  requiredEnumSchema,
  requiredTextSchema,
} from "@/lib/zod/schemas/common";
import {
  TEMPLATE_AUDIENCE_ORDER,
  TEMPLATE_LANG_ORDER,
  TEMPLATE_SCENARIO_ORDER,
} from "@/shared/constants/templates";

export const templateFormSchema = z.object({
  title: requiredTextSchema({
    min: 3,
    max: 120,
    message: "Название шаблона обязательно",
  }),
  lang: requiredEnumSchema({
    values: TEMPLATE_LANG_ORDER,
    message: "Выберите язык",
  }),
  audience: requiredEnumSchema({
    values: TEMPLATE_AUDIENCE_ORDER,
    message: "Выберите аудиторию",
  }),
  scenario: requiredEnumSchema({
    values: TEMPLATE_SCENARIO_ORDER,
    message: "Выберите сценарий",
  }),
  body: requiredTextSchema({
    min: 10,
    max: 4000,
    message: "Текст шаблона обязателен",
  }),
});

export type TemplateFormValues = z.infer<typeof templateFormSchema>;
