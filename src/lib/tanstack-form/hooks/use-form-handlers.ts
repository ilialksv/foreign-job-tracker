import type { AnyFormApi } from "@tanstack/react-form";
import type { FormEvent } from "react";
import { useCallback } from "react";

export const useFormHandlers = (params: { form: AnyFormApi }) => {
  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      params.form.handleSubmit();
    },
    [params.form],
  );

  const onFormReset = useCallback(() => {
    params.form.reset();
  }, [params.form]);

  return { onFormSubmit, onFormReset };
};
