import type { Task } from "@/shared/types/entities";
import { generateId } from "@/shared/utils/generate-id";

import { getInitialSteps, getStepDefinition } from "../constants/uae-flow";
import type { TaskDraft } from "../types";

const createDraft = (params: {
  companyId: string | null;
  stepKey: string;
  title: string;
  description: string;
  order: number;
  dependsOn: string[];
  dueAt: string | null;
  id?: string;
}): TaskDraft => ({
  id: params.id,
  companyId: params.companyId,
  kind: "stage",
  stepKey: params.stepKey,
  title: params.title,
  description: params.description,
  status: "todo",
  dueAt: params.dueAt,
  dependsOn: params.dependsOn,
  order: params.order,
  answers: {},
  outcome: null,
  createdBy: "system",
  completedAt: null,
});

export const buildInitialTasks = (params: {
  companyId: string;
}): TaskDraft[] => {
  const steps = getInitialSteps();
  const idByStepKey = new Map(steps.map((step) => [step.key, generateId()]));

  return steps.map((step) => {
    const dependsOn = step.dependsOn.reduce<string[]>((acc, dependencyKey) => {
      const dependencyId = idByStepKey.get(dependencyKey);

      return dependencyId ? [...acc, dependencyId] : acc;
    }, []);

    return createDraft({
      id: idByStepKey.get(step.key),
      companyId: params.companyId,
      stepKey: step.key,
      title: step.title,
      description: step.hint,
      order: step.order,
      dependsOn,
      dueAt: null,
    });
  });
};

export const buildStepTask = (params: {
  companyId: string;
  stepKey: string;
  dueAt: string | null;
}): TaskDraft | null => {
  const step = getStepDefinition({ stepKey: params.stepKey });

  if (!step) {
    return null;
  }

  return createDraft({
    companyId: params.companyId,
    stepKey: step.key,
    title: step.title,
    description: step.hint,
    order: step.order,
    dependsOn: [],
    dueAt: params.dueAt,
  });
};

export const buildCustomTask = (params: {
  companyId: string | null;
  title: string;
  description: string | null;
  dueAt: string | null;
}): Omit<Task, "id" | "createdAt" | "updatedAt"> => ({
  companyId: params.companyId,
  kind: "custom",
  stepKey: null,
  title: params.title,
  description: params.description,
  status: "todo",
  dueAt: params.dueAt,
  dependsOn: [],
  order: 500,
  answers: {},
  outcome: null,
  createdBy: "user",
  completedAt: null,
});
