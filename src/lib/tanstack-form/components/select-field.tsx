import { useStore } from "@tanstack/react-form";
import type { ChangeEvent, ReactNode } from "react";

import {
  FieldLayout,
  type FieldLayoutProps,
} from "@/shared/components/layouts/field-layout";
import { Select, type SelectProps } from "@/shared/components/ui/select";

import { useFieldContext } from "..";

export type SelectFieldProps = Omit<
  SelectProps,
  "id" | "name" | "state" | "value" | "onChange"
> & {
  label?: string | null;
  hint?: string | null;
  action?: ReactNode;
  fieldLayoutProps?: FieldLayoutProps;
};

export const SelectField = ({
  label,
  hint,
  action,
  fieldLayoutProps,
  ...props
}: SelectFieldProps) => {
  const {
    name,
    state: { value },
    store,
    handleChange,
    handleBlur,
  } = useFieldContext<string>();

  const errors: string[] = useStore(store, (state) => state.meta.errors);
  const hasError = errors.length > 0;

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
      <Select
        id={name}
        name={name}
        state={hasError ? "error" : "default"}
        aria-invalid={hasError}
        value={value}
        onChange={onSelectChange}
        onBlur={handleBlur}
        {...props}
      />
    </FieldLayout>
  );
};
