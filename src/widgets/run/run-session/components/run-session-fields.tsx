import type { StepField } from "@/lib/pipeline";
import type { TaskAnswerValue, TaskAnswers } from "@/shared/types/entities";

import { RunSessionField } from "./run-session-field";

export type RunSessionFieldsProps = {
  fields: StepField[];
  answers: TaskAnswers;
  onChange: (params: { key: string; value: TaskAnswerValue }) => void;
};

export const RunSessionFields = ({
  fields,
  answers,
  onChange,
}: RunSessionFieldsProps) => {
  if (fields.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {fields.map((field) => (
        <RunSessionField
          key={field.key}
          field={field}
          value={answers[field.key] ?? null}
          onChange={onChange}
        />
      ))}
    </div>
  );
};
