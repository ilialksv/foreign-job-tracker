import type { FormValidateFn } from "@tanstack/react-form";
import type { ZodType } from "zod";

export type FormValidateFnResult = {
  form?: string;
  fields?: Record<string, string>;
};

/** Превращает Zod-схему в валидатор формы TanStack Form. */
export const createFormValidateFn = <TValues extends Record<string, unknown>>(
  schema: ZodType<TValues>,
): FormValidateFn<TValues> => {
  return ({ value }) => {
    const result = schema.safeParse(value);

    if (result.success) {
      return;
    }

    const fields: Record<string, string> = {};
    const formErrors: string[] = [];

    result.error.issues.forEach((issue) => {
      if (issue.path.length === 0) {
        formErrors.push(issue.message);

        return;
      }

      let fieldPath = "";

      issue.path.forEach((part, index) => {
        if (index === 0) {
          fieldPath = String(part);

          return;
        }

        fieldPath =
          typeof part === "number"
            ? `${fieldPath}[${part}]`
            : `${fieldPath}.${String(part)}`;
      });

      if (!fields[fieldPath]) {
        fields[fieldPath] = issue.message;
      }
    });

    const validateResult: FormValidateFnResult = {
      form: formErrors[0],
      fields,
    };

    return validateResult;
  };
};
