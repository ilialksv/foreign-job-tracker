import type { BaseEntity } from "@/shared/types/entities";
import { nowIso } from "@/shared/utils/dates";

import { localStorageDriver } from "../drivers/local-storage-driver";
import type { DocumentRepository, UpdateInput } from "../types";

export const createDocumentRepository = <T extends BaseEntity>(params: {
  key: string;
  createDefault: () => T;
}): DocumentRepository<T> => {
  const read = (): T => {
    const stored = localStorageDriver.read<T>({ key: params.key });

    if (stored !== null) {
      return stored;
    }

    const fallback = params.createDefault();

    localStorageDriver.write({ key: params.key, value: fallback });

    return fallback;
  };

  const write = (value: T) => {
    localStorageDriver.write({ key: params.key, value });

    return value;
  };

  return {
    get: async () => read(),
    update: async ({ data }: { data: UpdateInput<T> }) =>
      write({ ...read(), ...data, updatedAt: nowIso() }),
    replace: async ({ data }) => write(data),
  };
};
