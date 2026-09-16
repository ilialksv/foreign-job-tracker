import type { ChangeEvent } from "react";
import { useCallback } from "react";

import type { StepField } from "@/lib/pipeline";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Field } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import type { TaskAnswerValue } from "@/shared/types/entities";

export type RunSessionFieldProps = {
  field: StepField;
  value: TaskAnswerValue;
  onChange: (params: { key: string; value: TaskAnswerValue }) => void;
};

export const RunSessionField = ({
  field,
  value,
  onChange,
}: RunSessionFieldProps) => {
  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ key: field.key, value: event.target.value });
    },
    [field.key, onChange],
  );

  const handleCheckboxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ key: field.key, value: event.target.checked });
    },
    [field.key, onChange],
  );

  if (field.type === "checkbox") {
    return (
      <Checkbox
        label={field.label}
        checked={value === true}
        onChange={handleCheckboxChange}
      />
    );
  }

  const textValue = typeof value === "string" ? value : "";

  if (field.type === "textarea") {
    return (
      <Field label={field.label} hint={field.hint}>
        <Textarea
          value={textValue}
          placeholder={field.placeholder}
          onChange={handleTextChange}
        />
      </Field>
    );
  }

  return (
    <Field label={field.label} hint={field.hint}>
      <Input
        value={textValue}
        placeholder={field.placeholder}
        inputMode={field.type === "url" ? "url" : "text"}
        onChange={handleTextChange}
      />
    </Field>
  );
};
