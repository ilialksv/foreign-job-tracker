import { useStore } from "@tanstack/react-form";
import type { ChangeEvent, ReactNode } from "react";

import {
  FieldLayout,
  type FieldLayoutProps,
} from "@/shared/components/layouts/field-layout";
import { Textarea, type TextareaProps } from "@/shared/components/ui/textarea";

import { useFieldContext } from "..";

export type TextareaFieldProps = Omit<
  TextareaProps,
  "id" | "name" | "state" | "value" | "onChange"
> & {
  label?: string | null;
  hint?: string | null;
  action?: ReactNode;
  fieldLayoutProps?: FieldLayoutProps;
};

export const TextareaField = ({
  label,
  hint,
  action,
  fieldLayoutProps,
  ...props
}: TextareaFieldProps) => {
  const {
    name,
    state: { value },
    store,
    handleChange,
    handleBlur,
  } = useFieldContext<string>();

  const errors: string[] = useStore(store, (state) => state.meta.errors);
  const hasError = errors.length > 0;

  const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(event.target.value);
  };

  return (
    <FieldLayout
      labelHtmlFor={name}
      labelText={label}
      action={action}
      message={errors[0] ?? hint}
      messageVariant={hasError ? "error" : "hint"}
      {...fieldLayoutProps}
    >
      <Textarea
        id={name}
        name={name}
        state={hasError ? "error" : "default"}
        aria-invalid={hasError}
        value={value}
        onChange={onTextareaChange}
        onBlur={handleBlur}
        {...props}
      />
    </FieldLayout>
  );
};
