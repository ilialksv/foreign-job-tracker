import type {
  BaseEntity,
  Company,
  CompanyEvent,
  Contact,
  Note,
  Settings,
  Task,
  Template,
  Vacancy,
} from "@/shared/types/entities";
import { nowIso } from "@/shared/utils/dates";

import { SCHEMA_VERSION } from "../constants/storage-keys";
import {
  companiesRepository,
  contactsRepository,
  eventsRepository,
  notesRepository,
  settingsRepository,
  tasksRepository,
  templatesRepository,
  vacanciesRepository,
} from "../repositories";

export type DatabaseSnapshot = {
  schemaVersion: number;
  exportedAt: string;
  data: {
    companies: Company[];
    contacts: Contact[];
    vacancies: Vacancy[];
    notes: Note[];
    tasks: Task[];
    events: CompanyEvent[];
    templates: Template[];
    settings: Settings;
  };
};

export type RestoreStrategy = "replace" | "merge";

export const createDatabaseSnapshot = async (): Promise<DatabaseSnapshot> => {
  const [
    companies,
    contacts,
    vacancies,
    notes,
    tasks,
    events,
    templates,
    settings,
  ] = await Promise.all([
    companiesRepository.list(),
    contactsRepository.list(),
    vacanciesRepository.list(),
    notesRepository.list(),
    tasksRepository.list(),
    eventsRepository.list(),
    templatesRepository.list(),
    settingsRepository.get(),
  ]);

  return {
    schemaVersion: SCHEMA_VERSION,
    exportedAt: nowIso(),
    data: {
      companies,
      contacts,
      vacancies,
      notes,
      tasks,
      events,
      templates,
      settings,
    },
  };
};

const mergeCollections = <T extends BaseEntity>(params: {
  current: T[];
  incoming: T[];
}) => {
  const merged = new Map(params.current.map((item) => [item.id, item]));

  params.incoming.forEach((item) => {
    const existing = merged.get(item.id);

    if (!existing || existing.updatedAt <= item.updatedAt) {
      merged.set(item.id, item);
    }
  });

  return Array.from(merged.values());
};

export const restoreDatabaseSnapshot = async (params: {
  snapshot: DatabaseSnapshot;
  strategy: RestoreStrategy;
}) => {
  const { data } = params.snapshot;

  if (params.strategy === "replace") {
    await Promise.all([
      companiesRepository.replaceAll({ items: data.companies }),
      contactsRepository.replaceAll({ items: data.contacts }),
      vacanciesRepository.replaceAll({ items: data.vacancies }),
      notesRepository.replaceAll({ items: data.notes }),
      tasksRepository.replaceAll({ items: data.tasks }),
      eventsRepository.replaceAll({ items: data.events }),
      settingsRepository.replace({ data: data.settings }),
    ]);

    // Пустой список шаблонов в файле импорта означает "шаблоны не переносим",
    // а не "удалить свои": иначе встроенные шаблоны исчезли бы без возврата.
    if (data.templates.length > 0) {
      await templatesRepository.replaceAll({ items: data.templates });
    }

    return;
  }

  const [companies, contacts, vacancies, notes, tasks, events, templates] =
    await Promise.all([
      companiesRepository.list(),
      contactsRepository.list(),
      vacanciesRepository.list(),
      notesRepository.list(),
      tasksRepository.list(),
      eventsRepository.list(),
      templatesRepository.list(),
    ]);

  await Promise.all([
    companiesRepository.replaceAll({
      items: mergeCollections({ current: companies, incoming: data.companies }),
    }),
    contactsRepository.replaceAll({
      items: mergeCollections({ current: contacts, incoming: data.contacts }),
    }),
    vacanciesRepository.replaceAll({
      items: mergeCollections({ current: vacancies, incoming: data.vacancies }),
    }),
    notesRepository.replaceAll({
      items: mergeCollections({ current: notes, incoming: data.notes }),
    }),
    tasksRepository.replaceAll({
      items: mergeCollections({ current: tasks, incoming: data.tasks }),
    }),
    eventsRepository.replaceAll({
      items: mergeCollections({ current: events, incoming: data.events }),
    }),
    templatesRepository.replaceAll({
      items: mergeCollections({ current: templates, incoming: data.templates }),
    }),
  ]);
};

export const clearDatabase = async () => {
  await Promise.all([
    companiesRepository.replaceAll({ items: [] }),
    contactsRepository.replaceAll({ items: [] }),
    vacanciesRepository.replaceAll({ items: [] }),
    notesRepository.replaceAll({ items: [] }),
    tasksRepository.replaceAll({ items: [] }),
    eventsRepository.replaceAll({ items: [] }),
  ]);
};
