import type { StepDefinition, StepOption } from "@/lib/pipeline";
import { Button } from "@/shared/components/ui/button";
import type { Task, TaskAnswers } from "@/shared/types/entities";

import { useRunSessionForm } from "../hooks/use-run-session-form";
import { RunSessionOptionButton } from "./run-session-option-button";

export type RunSessionFormProps = {
  step: StepDefinition;
  task: Task;
  isCompleted: boolean;
  isPending: boolean;
  onComplete: (params: { option: StepOption; answers: TaskAnswers }) => void;
  onSaveAnswers: (params: { answers: TaskAnswers }) => void;
  onReopen: () => void;
};

export const RunSessionForm = ({
  step,
  task,
  isCompleted,
  isPending,
  onComplete,
  onSaveAnswers,
  onReopen,
}: RunSessionFormProps) => {
  const { form, handleOptionClick, onFormSubmit } = useRunSessionForm({
    step,
    answers: task.answers,
    outcome: task.outcome,
    isCompleted,
    onComplete,
    onSaveAnswers,
  });

  return (
    <form onSubmit={onFormSubmit} noValidate className="flex flex-col gap-4">
      {step.fields.length > 0 ? (
        <div className="flex flex-col gap-3">
          {step.fields.map((stepField) => (
            <form.AppField key={stepField.key} name={stepField.key}>
              {(field) => {
                if (stepField.type === "checkbox") {
                  return <field.CheckboxField label={stepField.label} />;
                }

                if (stepField.type === "textarea") {
                  return (
                    <field.TextareaField
                      label={stepField.label}
                      hint={stepField.hint}
                      placeholder={stepField.placeholder}
                    />
                  );
                }

                return (
                  <field.InputField
                    label={stepField.label}
                    hint={stepField.hint}
                    placeholder={stepField.placeholder}
                    inputMode={stepField.type === "url" ? "url" : "text"}
                  />
                );
              }}
            </form.AppField>
          ))}
        </div>
      ) : null}

      {isCompleted ? (
        <div className="flex flex-wrap items-center gap-2">
          <form.AppForm>
            <form.SubmitButton disabled={isPending}>
              Сохранить ответы
            </form.SubmitButton>
          </form.AppForm>
          <Button variant="secondary" disabled={isPending} onClick={onReopen}>
            Вернуть шаг в работу
          </Button>
          <span className="text-[12.5px] text-muted">
            Эффекты прошлого исхода не откатываются
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {step.options.map((option) => (
            <RunSessionOptionButton
              key={option.value}
              option={option}
              disabled={isPending}
              onSelect={handleOptionClick}
            />
          ))}
        </div>
      )}
    </form>
  );
};
