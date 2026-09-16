import type {
  Company,
  CompanyEvent,
  Contact,
  Note,
  Settings,
  Task,
  Template,
  Vacancy,
} from "@/shared/types/entities";

import { createBuiltInTemplates } from "../constants/built-in-templates";
import { createDefaultSettings } from "../constants/default-settings";
import { STORAGE_KEYS } from "../constants/storage-keys";
import { createCollectionRepository } from "../utils/create-collection-repository";
import { createDocumentRepository } from "../utils/create-document-repository";
import { migrateTemplates } from "../utils/migrate-templates";

export const companiesRepository = createCollectionRepository<Company>({
  key: STORAGE_KEYS.companies,
});

export const contactsRepository = createCollectionRepository<Contact>({
  key: STORAGE_KEYS.contacts,
});

export const vacanciesRepository = createCollectionRepository<Vacancy>({
  key: STORAGE_KEYS.vacancies,
});

export const notesRepository = createCollectionRepository<Note>({
  key: STORAGE_KEYS.notes,
});

export const tasksRepository = createCollectionRepository<Task>({
  key: STORAGE_KEYS.tasks,
});

export const eventsRepository = createCollectionRepository<CompanyEvent>({
  key: STORAGE_KEYS.events,
});

export const templatesRepository = createCollectionRepository<Template>({
  key: STORAGE_KEYS.templates,
  createSeed: createBuiltInTemplates,
  migrate: migrateTemplates,
});

export const settingsRepository = createDocumentRepository<Settings>({
  key: STORAGE_KEYS.settings,
  createDefault: createDefaultSettings,
});
