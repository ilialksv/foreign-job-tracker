import type { DeepKeys, FieldValidateFn } from "@tanstack/react-form";
import type { ZodType } from "zod";

/** Превращает Zod-схему в валидатор одного поля. */
export const createFieldValidateFn = <
  TValues,
  TFieldName extends DeepKeys<TValues>,
>(
  schema: ZodType,
): FieldValidateFn<TValues, TFieldName> => {
  return ({ value }) => {
    const result = schema.safeParse(value);

    if (!result.success) {
      return result.error.issues[0].message;
    }
  };
};
