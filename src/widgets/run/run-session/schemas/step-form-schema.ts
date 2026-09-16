import type { ZodType } from "zod";

import type { StepDefinition } from "@/lib/pipeline";
import { z } from "@/lib/zod";
import {
  isHttpUrl,
  REQUIRED_MESSAGE,
  URL_MESSAGE,
} from "@/lib/zod/schemas/common";

/** Служебное поле формы шага: какой исход выбрал пользователь. */
export const STEP_OUTCOME_FIELD = "__outcome";

export type StepFormValues = Record<string, string | boolean>;

const CHECKBOX_REQUIRED_MESSAGE = "Нужно подтвердить";

const getRequiredFieldKeys = (params: {
  step: StepDefinition;
  outcome: string;
}) => {
  const option = params.step.options.find(
    (item) => item.value === params.outcome,
  );

  return new Set([
    ...params.step.fields
      .filter((field) => field.required)
      .map((field) => field.key),
    ...(option?.requiredFields ?? []),
  ]);
};

/**
 * Схема формы шага собирается из его определения: типы полей статичны,
 * а обязательность зависит от выбранного исхода.
 */
export const createStepFormSchema = (params: {
  step: StepDefinition;
}): ZodType<StepFormValues> => {
  // Исход не проверяется схемой: в режиме выполнения он приходит из нажатой
  // кнопки, а при правке закрытого шага берётся из сохранённого значения.
  const shape: Record<string, ZodType<string | boolean>> = {
    [STEP_OUTCOME_FIELD]: z.string(),
  };

  params.step.fields.forEach((field) => {
    shape[field.key] = field.type === "checkbox" ? z.boolean() : z.string();
  });

  return z.object(shape).superRefine((values, ctx) => {
    const outcome = values[STEP_OUTCOME_FIELD];
    const requiredKeys = getRequiredFieldKeys({
      step: params.step,
      outcome: typeof outcome === "string" ? outcome : "",
    });

    params.step.fields.forEach((field) => {
      const value = values[field.key];
      const isRequired = requiredKeys.has(field.key);

      if (field.type === "checkbox") {
        if (isRequired && value !== true) {
          ctx.addIssue({
            code: "custom",
            path: [field.key],
            message: CHECKBOX_REQUIRED_MESSAGE,
          });
        }

        return;
      }

      const text = typeof value === "string" ? value.trim() : "";

      if (isRequired && text.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: [field.key],
          message: REQUIRED_MESSAGE,
        });

        return;
      }

      if (field.type === "url" && text.length > 0 && !isHttpUrl(text)) {
        ctx.addIssue({
          code: "custom",
          path: [field.key],
          message: URL_MESSAGE,
        });
      }
    });
  });
};
