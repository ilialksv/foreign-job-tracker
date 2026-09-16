import { useStore } from "@tanstack/react-form";
import type { ChangeEvent, ReactNode } from "react";

import {
  FieldLayout,
  type FieldLayoutProps,
} from "@/shared/components/layouts/field-layout";
import { Input, type InputProps } from "@/shared/components/ui/input";

import { useFieldContext } from "..";

export type InputFieldProps = Omit<
  InputProps,
  "id" | "name" | "state" | "value" | "onChange"
> & {
  label?: string | null;
  hint?: string | null;
  action?: ReactNode;
  fieldLayoutProps?: FieldLayoutProps;
};

export const InputField = ({
  label,
  hint,
  action,
  fieldLayoutProps,
  ...props
}: InputFieldProps) => {
  const {
    name,
    state: { value },
    store,
    handleChange,
    handleBlur,
  } = useFieldContext<string>();

  const errors: string[] = useStore(store, (state) => state.meta.errors);
  const hasError = errors.length > 0;

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      <Input
        id={name}
        name={name}
        state={hasError ? "error" : "default"}
        aria-invalid={hasError}
        value={value}
        onChange={onInputChange}
        onBlur={handleBlur}
        {...props}
      />
    </FieldLayout>
  );
};
