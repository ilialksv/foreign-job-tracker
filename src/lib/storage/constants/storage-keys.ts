export const STORAGE_NAMESPACE = "fjt";

export const SCHEMA_VERSION = 1;

export const STORAGE_KEYS = {
  schemaVersion: `${STORAGE_NAMESPACE}:schema-version`,
  companies: `${STORAGE_NAMESPACE}:companies`,
  contacts: `${STORAGE_NAMESPACE}:contacts`,
  vacancies: `${STORAGE_NAMESPACE}:vacancies`,
  notes: `${STORAGE_NAMESPACE}:notes`,
  tasks: `${STORAGE_NAMESPACE}:tasks`,
  events: `${STORAGE_NAMESPACE}:events`,
  templates: `${STORAGE_NAMESPACE}:templates`,
  settings: `${STORAGE_NAMESPACE}:settings`,
} as const;
