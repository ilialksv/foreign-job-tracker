import { Button, type ButtonProps } from "@/shared/components/ui/button";

import { useFormContext } from "..";

export type SubmitButtonProps = Omit<ButtonProps, "type">;

export const SubmitButton = ({
  disabled,
  variant = "primary",
  children,
  ...props
}: SubmitButtonProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting] as const}
    >
      {([canSubmit, isSubmitting]) => (
        <Button
          type="submit"
          variant={variant}
          disabled={disabled || !canSubmit || isSubmitting}
          {...props}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
};
