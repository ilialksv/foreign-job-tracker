import type { DatabaseSnapshot } from "@/lib/storage/utils/database-snapshot";
import { z } from "@/lib/zod";

const entitySchema = z.looseObject({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const databaseSnapshotSchema = z.object({
  schemaVersion: z.number(),
  exportedAt: z.string(),
  data: z.object({
    companies: z.array(entitySchema),
    contacts: z.array(entitySchema),
    vacancies: z.array(entitySchema),
    notes: z.array(entitySchema),
    tasks: z.array(entitySchema),
    events: z.array(entitySchema),
    templates: z.array(entitySchema),
    settings: entitySchema,
  }),
});

export const parseDatabaseSnapshot = (params: {
  raw: unknown;
}): DatabaseSnapshot | null => {
  const result = databaseSnapshotSchema.safeParse(params.raw);

  if (!result.success) {
    return null;
  }

  return params.raw as DatabaseSnapshot;
};
