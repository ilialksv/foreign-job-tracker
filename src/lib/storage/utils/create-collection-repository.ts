import type { BaseEntity } from "@/shared/types/entities";
import { nowIso } from "@/shared/utils/dates";

import { generateId } from "@/shared/utils/generate-id";

import { localStorageDriver } from "../drivers/local-storage-driver";
import type {
  CollectionMigration,
  CollectionRepository,
  CreateInput,
  UpdateInput,
} from "../types";

export const createCollectionRepository = <T extends BaseEntity>(params: {
  key: string;
  createSeed?: () => CreateInput<T>[];
  migrate?: CollectionMigration<T>;
}): CollectionRepository<T> => {
  const readAll = (): T[] => {
    const stored = localStorageDriver.read<T[]>({ key: params.key });

    if (stored !== null) {
      if (!params.migrate) {
        return stored;
      }

      const migrated = params.migrate({ items: stored });

      if (migrated.changed) {
        localStorageDriver.write({ key: params.key, value: migrated.items });
      }

      return migrated.items;
    }

    if (!params.createSeed) {
      return [];
    }

    const seeded = params
      .createSeed()
      .map((item) => buildEntity({ data: item }));

    localStorageDriver.write({ key: params.key, value: seeded });

    return seeded;
  };

  const writeAll = (items: T[]) => {
    localStorageDriver.write({ key: params.key, value: items });

    return items;
  };

  const buildEntity = (input: { data: CreateInput<T> }): T => {
    const timestamp = nowIso();
    const { id, ...rest } = input.data;

    const entity: BaseEntity = {
      id: id ?? generateId(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    return { ...rest, ...entity } as T;
  };

  const applyUpdate = (input: { item: T; data: UpdateInput<T> }): T => ({
    ...input.item,
    ...input.data,
    updatedAt: nowIso(),
  });

  return {
    list: async () => readAll(),
    getById: async ({ id }) => readAll().find((item) => item.id === id) ?? null,
    create: async ({ data }) => {
      const entity = buildEntity({ data });

      writeAll([...readAll(), entity]);

      return entity;
    },
    createMany: async ({ items }) => {
      const entities = items.map((data) => buildEntity({ data }));

      writeAll([...readAll(), ...entities]);

      return entities;
    },
    update: async ({ id, data }) => {
      const items = readAll();
      const target = items.find((item) => item.id === id);

      if (!target) {
        throw new Error(`Запись ${id} не найдена`);
      }

      const updated = applyUpdate({ item: target, data });

      writeAll(items.map((item) => (item.id === id ? updated : item)));

      return updated;
    },
    updateMany: async ({ updates }) => {
      const items = readAll();
      const updatedIds = new Set(updates.map((update) => update.id));
      const nextItems = items.map((item) => {
        if (!updatedIds.has(item.id)) {
          return item;
        }

        const update = updates.find((entry) => entry.id === item.id);

        return update ? applyUpdate({ item, data: update.data }) : item;
      });

      writeAll(nextItems);

      return nextItems.filter((item) => updatedIds.has(item.id));
    },
    remove: async ({ id }) => {
      writeAll(readAll().filter((item) => item.id !== id));
    },
    removeMany: async ({ ids }) => {
      const removed = new Set(ids);

      writeAll(readAll().filter((item) => !removed.has(item.id)));
    },
    replaceAll: async ({ items }) => writeAll(items),
  };
};
