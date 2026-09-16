import type { BaseEntity } from "@/shared/types/entities";

export type StorageDriver = {
  read: <T>(params: { key: string }) => T | null;
  write: <T>(params: { key: string; value: T }) => boolean;
  remove: (params: { key: string }) => void;
};

export type CreateInput<T extends BaseEntity> = Omit<T, keyof BaseEntity> & {
  id?: string;
};

export type UpdateInput<T extends BaseEntity> = Partial<
  Omit<T, keyof BaseEntity>
>;

export type CollectionMigration<T extends BaseEntity> = (params: {
  items: unknown[];
}) => { items: T[]; changed: boolean };

export type CollectionRepository<T extends BaseEntity> = {
  list: () => Promise<T[]>;
  getById: (params: { id: string }) => Promise<T | null>;
  create: (params: { data: CreateInput<T> }) => Promise<T>;
  createMany: (params: { items: CreateInput<T>[] }) => Promise<T[]>;
  update: (params: { id: string; data: UpdateInput<T> }) => Promise<T>;
  updateMany: (params: {
    updates: { id: string; data: UpdateInput<T> }[];
  }) => Promise<T[]>;
  remove: (params: { id: string }) => Promise<void>;
  removeMany: (params: { ids: string[] }) => Promise<void>;
  replaceAll: (params: { items: T[] }) => Promise<T[]>;
};

export type DocumentRepository<T extends BaseEntity> = {
  get: () => Promise<T>;
  update: (params: { data: UpdateInput<T> }) => Promise<T>;
  replace: (params: { data: T }) => Promise<T>;
};
