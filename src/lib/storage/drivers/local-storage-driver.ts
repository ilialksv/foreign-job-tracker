import { parseJson } from "@/shared/utils/parse-json";

import type { StorageDriver } from "../types";

export const localStorageDriver: StorageDriver = {
  read: <T>(params: { key: string }) => {
    try {
      const raw = window.localStorage.getItem(params.key);

      if (raw === null) {
        return null;
      }

      return parseJson<T>(raw);
    } catch {
      return null;
    }
  },
  write: <T>(params: { key: string; value: T }) => {
    try {
      window.localStorage.setItem(params.key, JSON.stringify(params.value));

      return true;
    } catch {
      return false;
    }
  },
  remove: (params: { key: string }) => {
    try {
      window.localStorage.removeItem(params.key);
    } catch {
      return;
    }
  },
};
