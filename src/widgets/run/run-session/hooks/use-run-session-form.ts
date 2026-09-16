import { useCallback, useMemo } from "react";

import type { StepDefinition, StepOption } from "@/lib/pipeline";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import type { TaskAnswers } from "@/shared/types/entities";

import { STEP_OUTCOME_FIELD } from "../schemas/step-form-schema";
import {
  prepareStepAnswers,
  prepareStepFormValues,
} from "../utils/prepare-step-form-values";
import { createStepFormValidateFn } from "../utils/step-form-helpers";

export const useRunSessionForm = (params: {
  step: StepDefinition;
  answers: TaskAnswers;
  outcome: string | null;
  isCompleted: boolean;
  onComplete: (completeParams: {
    option: StepOption;
    answers: TaskAnswers;
  }) => void;
  onSaveAnswers: (saveParams: { answers: TaskAnswers }) => void;
}) => {
  const validateFn = useMemo(
    () => createStepFormValidateFn({ step: params.step }),
    [params.step],
  );

  const form = useAppForm({
    defaultValues: prepareStepFormValues({
      step: params.step,
      answers: params.answers,
      outcome: params.outcome,
    }),
    validators: { onSubmit: validateFn },
    onSubmit: ({ value }) => {
      const answers = prepareStepAnswers({ step: params.step, values: value });

      if (params.isCompleted) {
        params.onSaveAnswers({ answers });

        return;
      }

      const outcome = value[STEP_OUTCOME_FIELD];
      const option = params.step.options.find((item) => item.value === outcome);

      if (!option) {
        return;
      }

      params.onComplete({ option, answers });
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  const handleOptionClick = useCallback(
    (option: StepOption) => {
      form.setFieldValue(STEP_OUTCOME_FIELD, option.value);
    },
    [form],
  );

  return { form, handleOptionClick, onFormSubmit };
};
