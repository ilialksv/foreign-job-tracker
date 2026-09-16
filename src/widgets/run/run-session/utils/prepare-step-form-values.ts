import type { StepDefinition } from "@/lib/pipeline";
import type { TaskAnswers } from "@/shared/types/entities";

import type { StepFormValues } from "../schemas/step-form-schema";
import { STEP_OUTCOME_FIELD } from "../schemas/step-form-schema";

export const prepareStepFormValues = (params: {
  step: StepDefinition;
  answers: TaskAnswers;
  outcome: string | null;
}): StepFormValues => {
  const values: StepFormValues = {
    [STEP_OUTCOME_FIELD]: params.outcome ?? "",
  };

  params.step.fields.forEach((field) => {
    const storedValue = params.answers[field.key];

    if (field.type === "checkbox") {
      values[field.key] = storedValue === true;

      return;
    }

    values[field.key] = typeof storedValue === "string" ? storedValue : "";
  });

  return values;
};

export const prepareStepAnswers = (params: {
  step: StepDefinition;
  values: StepFormValues;
}): TaskAnswers => {
  const answers: TaskAnswers = {};

  params.step.fields.forEach((field) => {
    const value = params.values[field.key];

    answers[field.key] =
      typeof value === "string" ? value.trim() : value === true;
  });

  return answers;
};
