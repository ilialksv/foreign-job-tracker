import {
  type AnyFormApi,
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form";

import { CheckboxField } from "./components/checkbox-field";
import { InputField } from "./components/input-field";
import { ResetButton } from "./components/reset-button";
import { SelectField } from "./components/select-field";
import { SubmitButton } from "./components/submit-button";
import { TextareaField } from "./components/textarea-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    TextareaField,
    SelectField,
    CheckboxField,
  },
  formComponents: { SubmitButton, ResetButton },
});

export type AppFormApi = AnyFormApi;
