import type { PipelinePatch } from "@/lib/pipeline";
import { resolveCompanyStatus } from "@/lib/pipeline";
import {
  companiesRepository,
  contactsRepository,
  eventsRepository,
  tasksRepository,
  vacanciesRepository,
} from "@/lib/storage/repositories";
import type { Company, TaskAnswers } from "@/shared/types/entities";
import { nowIso } from "@/shared/utils/dates";

export const applyPipelinePatch = async (params: {
  patch: PipelinePatch;
  company: Company;
  answers: TaskAnswers;
}) => {
  const { patch, company } = params;

  if (patch.taskUpdates.length > 0) {
    await tasksRepository.updateMany({ updates: patch.taskUpdates });
  }

  if (patch.tasksToCreate.length > 0) {
    await tasksRepository.createMany({ items: patch.tasksToCreate });
  }

  if (patch.contactUpdates.length > 0) {
    const contacts = await contactsRepository.list();

    for (const update of patch.contactUpdates) {
      const target = contacts.find(
        (contact) =>
          contact.companyId === company.id && contact.role === update.role,
      );

      if (target) {
        await contactsRepository.update({
          id: target.id,
          data: { status: update.status, lastTouchAt: nowIso() },
        });
      }
    }
  }

  if (patch.markVacancyApplied) {
    const vacancies = await vacanciesRepository.list();
    const target = vacancies.find(
      (vacancy) =>
        vacancy.companyId === company.id && vacancy.status === "open",
    );

    if (target) {
      await vacanciesRepository.update({
        id: target.id,
        data: { status: "applied", appliedAt: nowIso() },
      });
    }
  }

  const companyWithPatch: Company = {
    ...company,
    ...(patch.companyPatch ?? {}),
  };
  const tasks = await tasksRepository.list();
  const status = resolveCompanyStatus({ company: companyWithPatch, tasks });

  await companiesRepository.update({
    id: company.id,
    data: { ...(patch.companyPatch ?? {}), status, lastTouchAt: nowIso() },
  });

  for (const event of patch.events) {
    await eventsRepository.create({
      data: {
        companyId: company.id,
        type: event.type,
        title: event.title,
        details: event.details,
      },
    });
  }
};
