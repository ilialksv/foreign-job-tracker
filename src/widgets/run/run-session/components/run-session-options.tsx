import { useCallback } from "react";

import type { StepOption } from "@/lib/pipeline";
import { Button } from "@/shared/components/ui/button";

export type RunSessionOptionButtonProps = {
  option: StepOption;
  disabled: boolean;
  onSelect: (option: StepOption) => void;
};

export const RunSessionOptionButton = ({
  option,
  disabled,
  onSelect,
}: RunSessionOptionButtonProps) => {
  const handleClick = useCallback(() => {
    onSelect(option);
  }, [onSelect, option]);

  const variant =
    option.tone === "primary"
      ? "primary"
      : option.tone === "danger"
        ? "danger"
        : "secondary";

  return (
    <Button variant={variant} disabled={disabled} onClick={handleClick}>
      {option.label}
    </Button>
  );
};
