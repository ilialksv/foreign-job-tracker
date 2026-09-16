import type { CreateInput } from "@/lib/storage/types";
import type {
  Company,
  CompanyDepth,
  CompanyStatus,
  Contact,
  ContactRole,
} from "@/shared/types/entities";
import { nowIso } from "@/shared/utils/dates";

import type { CsvRow } from "./parse-csv";

export type CsvImportDraft = {
  company: CreateInput<Company>;
  contacts: Omit<CreateInput<Contact>, "companyId">[];
  nextContactDate: string | null;
};

const DEPTH_BY_LABEL: Record<string, CompanyDepth> = {
  Быстрый: "quick",
  Стандартный: "standard",
  Глубокий: "deep",
};

const STATUS_BY_LABEL: Record<string, CompanyStatus> = {
  "В ожидании": "queued",
  "Запрос на контакт": "active",
  "Первый контакт": "active",
  Исключено: "excluded",
};

const parseRussianDate = (params: { value: string }) => {
  const match = params.value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  if (!match) {
    return null;
  }

  const [, day, month, year] = match;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));

  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
};

const parseLinks = (params: { value: string; role: ContactRole }) =>
  params.value
    .split(/[\s,;]+/)
    .map((link) => link.trim())
    .filter((link) => link.startsWith("http"))
    .map((link) => ({
      name: "Без имени",
      role: params.role,
      title: null,
      linkedinUrl: link,
      language: "en" as const,
      status: "none" as const,
      lastTouchAt: null,
      notes: null,
    }));

export const mapCsvCompanies = (params: {
  rows: CsvRow[];
  countryCode: string;
}): CsvImportDraft[] =>
  params.rows
    .filter((row) => (row["Компания"] ?? "").trim().length > 0)
    .map((row) => {
      const queueTier = (row["Очередь"] ?? "").trim();
      const depthLabel = (row["Уровень"] ?? "").trim();
      const statusLabel = (row["Статус"] ?? "").trim();
      const lastTouchAt = parseRussianDate({
        value: (row["Дата контакта"] ?? "").trim(),
      });
      const nextContactDate = parseRussianDate({
        value: (row["Следующий контакт"] ?? "").trim(),
      });

      const company: CreateInput<Company> = {
        name: (row["Компания"] ?? "").trim(),
        countryCode: params.countryCode,
        city: null,
        website: null,
        careersUrl: null,
        ats: null,
        queueTier: queueTier.length > 0 ? queueTier : null,
        depth: DEPTH_BY_LABEL[depthLabel] ?? "standard",
        engineeringSize: "unknown",
        hasRussianSpeakers: null,
        stack: [],
        info: (row["Информация"] ?? "").trim(),
        tags: [],
        status: STATUS_BY_LABEL[statusLabel] ?? "queued",
        excludeReason: null,
        reviveAt: null,
        lastTouchAt,
        archivedAt: null,
      };

      const contacts = [
        ...parseLinks({ value: row["Нанимающий(е)"] ?? "", role: "hiring" }),
        ...parseLinks({ value: row["Инженер(ы)"] ?? "", role: "engineer" }),
      ];

      return { company, contacts, nextContactDate: nextContactDate ?? null };
    });

export const createImportedAtNote = () => `Импортировано ${nowIso()}`;
