import { useStore } from "@tanstack/react-form";
import type { ChangeEvent, ReactNode } from "react";

import {
  FieldLayout,
  type FieldLayoutProps,
} from "@/shared/components/layouts/field-layout";
import { Checkbox, type CheckboxProps } from "@/shared/components/ui/checkbox";

import { useFieldContext } from "..";

export type CheckboxFieldProps = Omit<
  CheckboxProps,
  "id" | "name" | "state" | "checked" | "onChange"
> & {
  label: ReactNode;
  fieldLayoutProps?: FieldLayoutProps;
};

export const CheckboxField = ({
  label,
  fieldLayoutProps,
  ...props
}: CheckboxFieldProps) => {
  const {
    name,
    state: { value },
    store,
    handleChange,
    handleBlur,
  } = useFieldContext<boolean>();

  const errors: string[] = useStore(store, (state) => state.meta.errors);
  const hasError = errors.length > 0;

  const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.checked);
  };

  return (
    <FieldLayout message={errors[0]} {...fieldLayoutProps}>
      <div className="flex items-start gap-2">
        <Checkbox
          id={name}
          name={name}
          state={hasError ? "error" : "default"}
          aria-invalid={hasError}
          checked={value}
          onChange={onCheckboxChange}
          onBlur={handleBlur}
          {...props}
        />
        <label htmlFor={name} className="text-[13.5px] leading-5 text-ink">
          {label}
        </label>
      </div>
    </FieldLayout>
  );
};
