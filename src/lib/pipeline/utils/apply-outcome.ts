import { nowIso, shiftDaysIso, shiftWeeksIso } from "@/shared/utils/dates";

import type {
  ApplyOutcomeParams,
  CompanyPatch,
  PipelinePatch,
  TaskDraft,
} from "../types";
import { buildStepTask } from "./build-tasks";
import { isTaskOpen } from "./task-state";

const readAnswerText = (params: {
  answers: ApplyOutcomeParams["answers"];
  key: string;
}) => {
  const value = params.answers[params.key];

  return typeof value === "string" && value.length > 0 ? value : null;
};

export const applyOutcome = (params: ApplyOutcomeParams): PipelinePatch => {
  const { step, option, task, company, tasks, answers } = params;

  const patch: PipelinePatch = {
    taskUpdates: [
      {
        id: task.id,
        data: {
          status: "done",
          outcome: option.value,
          answers,
          completedAt: nowIso(),
        },
      },
    ],
    tasksToCreate: [],
    companyPatch: null,
    contactUpdates: [],
    markVacancyApplied: false,
    events: [],
  };

  const companyTasks = tasks.filter((item) => item.companyId === company.id);

  const mergeCompanyPatch = (data: CompanyPatch) => {
    patch.companyPatch = { ...(patch.companyPatch ?? {}), ...data };
  };

  const scheduleStep = (stepKey: string, dueAt: string | null) => {
    const alreadyPlanned = patch.tasksToCreate.some(
      (draft: TaskDraft) => draft.stepKey === stepKey,
    );

    if (alreadyPlanned) {
      return;
    }

    const existing = companyTasks.find(
      (item) =>
        item.stepKey === stepKey &&
        item.id !== task.id &&
        isTaskOpen({ task: item }),
    );

    if (existing) {
      patch.taskUpdates.push({
        id: existing.id,
        data: { dueAt, status: "todo" },
      });

      return;
    }

    const draft = buildStepTask({ companyId: company.id, stepKey, dueAt });

    if (draft) {
      patch.tasksToCreate.push(draft);
    }
  };

  option.effects.forEach((effect) => {
    if (effect.type === "skip_step") {
      const target = companyTasks.find(
        (item) => item.stepKey === effect.stepKey && isTaskOpen({ task: item }),
      );

      if (target) {
        patch.taskUpdates.push({ id: target.id, data: { status: "skipped" } });
      }

      return;
    }

    if (effect.type === "schedule_step") {
      scheduleStep(effect.stepKey, shiftDaysIso({ days: effect.inDays }));

      return;
    }

    if (effect.type === "set_company_status") {
      mergeCompanyPatch({ status: effect.status });

      return;
    }

    if (effect.type === "set_engineering_size") {
      mergeCompanyPatch({ engineeringSize: effect.size });

      return;
    }

    if (effect.type === "set_contact_status") {
      patch.contactUpdates.push({ role: effect.role, status: effect.status });

      return;
    }

    if (effect.type === "mark_vacancy_applied") {
      patch.markVacancyApplied = true;
      patch.events.push({
        type: "applied",
        title: "Отклик отправлен",
        details: readAnswerText({ answers, key: "vacancyUrl" }),
      });

      return;
    }

    if (effect.type === "close_company") {
      mergeCompanyPatch({
        status: effect.status,
        excludeReason:
          effect.status === "excluded"
            ? readAnswerText({ answers, key: "stopSignal" })
            : null,
        reviveAt: effect.reviveInWeeks
          ? shiftWeeksIso({ weeks: effect.reviveInWeeks })
          : null,
      });

      companyTasks
        .filter((item) => item.id !== task.id && isTaskOpen({ task: item }))
        .forEach((item) => {
          patch.taskUpdates.push({ id: item.id, data: { status: "skipped" } });
        });

      if (effect.reviveInWeeks) {
        const draft = buildStepTask({
          companyId: company.id,
          stepKey: "revive",
          dueAt: shiftWeeksIso({ weeks: effect.reviveInWeeks }),
        });

        if (draft) {
          patch.tasksToCreate.push(draft);
        }
      }
    }
  });

  patch.events.push({
    type: "step_done",
    title: `${step.title}: ${option.label}`,
    details: readAnswerText({ answers, key: "productDetail" }),
  });

  return patch;
};
