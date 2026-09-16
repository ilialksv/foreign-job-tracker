import type { FormValidateFn } from "@tanstack/react-form";
import { isEqual } from "es-toolkit";
import type { ZodType } from "zod";

import { createFormValidateFn } from "./create-form-validate-fn";

const MATCH_FORM_MESSAGE = "Чтобы сохранить, измените хотя бы одно поле";
const MATCH_FIELD_MESSAGE = "Новое значение совпадает с текущим";

/**
 * Валидация формы редактирования: Zod плюс запрет на повторное сохранение
 * неизменённых значений.
 */
export const createFormMatchValidateFn = <
  TValues extends Record<string, unknown>,
>(
  schema: ZodType<TValues>,
): FormValidateFn<TValues> => {
  const validateFn = createFormValidateFn(schema);

  return ({ value, formApi }) => {
    const result = validateFn({ value, formApi });

    if (result) {
      return result;
    }

    const defaultValues = formApi.options.defaultValues;

    if (!defaultValues || !isEqual(value, defaultValues)) {
      return;
    }

    const fieldNames = Object.keys(value);

    if (fieldNames.length === 1) {
      return { fields: { [fieldNames[0]]: MATCH_FIELD_MESSAGE } };
    }

    return { form: MATCH_FORM_MESSAGE, fields: {} };
  };
};
