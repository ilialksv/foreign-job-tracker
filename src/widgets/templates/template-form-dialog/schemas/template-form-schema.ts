import { z } from "@/lib/zod";
import {
  requiredEnumSchema,
  requiredTextSchema,
} from "@/lib/zod/schemas/common";
import { optionalTextSchema } from "@/lib/zod/schemas/common";
import {
  TEMPLATE_AUDIENCE_ORDER,
  TEMPLATE_SCENARIO_ORDER,
} from "@/shared/constants/templates";

export const templateFormSchema = z
  .object({
    title: requiredTextSchema({
      min: 3,
      max: 120,
      message: "Название шаблона обязательно",
    }),
    audience: requiredEnumSchema({
      values: TEMPLATE_AUDIENCE_ORDER,
      message: "Выберите аудиторию",
    }),
    scenario: requiredEnumSchema({
      values: TEMPLATE_SCENARIO_ORDER,
      message: "Выберите сценарий",
    }),
    bodyEn: optionalTextSchema({ max: 4000 }),
    bodyRu: optionalTextSchema({ max: 4000 }),
  })
  .superRefine((values, ctx) => {
    if (values.bodyEn.length > 0 || values.bodyRu.length > 0) {
      return;
    }

    ctx.addIssue({
      code: "custom",
      path: ["bodyEn"],
      message: "Заполните хотя бы один язык",
    });
  });

export type TemplateFormValues = z.infer<typeof templateFormSchema>;
