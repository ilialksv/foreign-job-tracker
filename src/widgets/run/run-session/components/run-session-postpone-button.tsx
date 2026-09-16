import { useCallback } from "react";

import { Button } from "@/shared/components/ui/button";

export type PostponeOption = {
  days: number;
  label: string;
};

export type RunSessionPostponeButtonProps = {
  option: PostponeOption;
  onSelect: (params: { days: number }) => void;
};

export const RunSessionPostponeButton = ({
  option,
  onSelect,
}: RunSessionPostponeButtonProps) => {
  const handleClick = useCallback(() => {
    onSelect({ days: option.days });
  }, [onSelect, option.days]);

  return (
    <Button size="sm" variant="ghost" onClick={handleClick}>
      {option.label}
    </Button>
  );
};
