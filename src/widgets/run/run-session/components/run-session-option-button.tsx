import { useCallback } from "react";

import type { StepOption } from "@/lib/pipeline";
import { Button } from "@/shared/components/ui/button";

export type RunSessionOptionButtonProps = {
  option: StepOption;
  disabled: boolean;
  onSelect: (option: StepOption) => void;
};

const VARIANT_BY_TONE = {
  primary: "primary",
  danger: "danger",
  neutral: "secondary",
} as const;

export const RunSessionOptionButton = ({
  option,
  disabled,
  onSelect,
}: RunSessionOptionButtonProps) => {
  const handleClick = useCallback(() => {
    onSelect(option);
  }, [onSelect, option]);

  const variant = VARIANT_BY_TONE[option.tone ?? "neutral"];

  return (
    <Button
      type="submit"
      variant={variant}
      disabled={disabled}
      onClick={handleClick}
    >
      {option.label}
    </Button>
  );
};
