import { useStore } from "@tanstack/react-form";
import { isEqual } from "es-toolkit";

import { Button, type ButtonProps } from "@/shared/components/ui/button";

import { useFormContext } from "..";

export type ResetButtonProps = Omit<ButtonProps, "type" | "onClick"> & {
  onResetCallback?: () => void;
};

export const ResetButton = ({
  disabled,
  onResetCallback,
  children,
  ...props
}: ResetButtonProps) => {
  const form = useFormContext();
  const values = useStore(form.store, (state) => state.values);
  const hasChanges = !isEqual(values, form.options.defaultValues);

  const onResetButtonClick = () => {
    form.reset();
    onResetCallback?.();
  };

  return (
    <Button
      type="reset"
      disabled={!hasChanges || disabled}
      onClick={onResetButtonClick}
      {...props}
    >
      {children}
    </Button>
  );
};
