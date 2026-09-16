import type {
  AtsKind,
  CompanyDepth,
  CompanyStatus,
  EngineeringSize,
} from "@/shared/types/entities";

export type BadgeTone =
  "neutral" | "accent" | "danger" | "warn" | "ok" | "outline";

export const COMPANY_STATUS_LABELS: Record<CompanyStatus, string> = {
  queued: "В очереди",
  active: "В работе",
  waiting: "Ждём ответа",
  responded: "Ответили",
  interviewing: "Интервью",
  offer: "Оффер",
  rejected: "Отказ",
  dormant: "Реанимация",
  excluded: "Исключена",
};

export const COMPANY_STATUS_TONES: Record<CompanyStatus, BadgeTone> = {
  queued: "neutral",
  active: "accent",
  waiting: "warn",
  responded: "ok",
  interviewing: "ok",
  offer: "ok",
  rejected: "danger",
  dormant: "neutral",
  excluded: "danger",
};

export const COMPANY_STATUS_ORDER: CompanyStatus[] = [
  "queued",
  "active",
  "waiting",
  "responded",
  "interviewing",
  "offer",
  "rejected",
  "dormant",
  "excluded",
];

export const COMPANY_DEPTH_LABELS: Record<CompanyDepth, string> = {
  quick: "Быстрый",
  standard: "Стандартный",
  deep: "Глубокий",
};

export const COMPANY_DEPTH_ORDER: CompanyDepth[] = [
  "deep",
  "standard",
  "quick",
];

export const ENGINEERING_SIZE_LABELS: Record<EngineeringSize, string> = {
  lt50: "до 50 инженеров",
  from50to200: "50–200 инженеров",
  gt200: "200+ инженеров",
  unknown: "размер неизвестен",
};

export const ATS_LABELS: Record<AtsKind, string> = {
  greenhouse: "Greenhouse",
  workable: "Workable",
  lever: "Lever",
  ashby: "Ashby",
  teamtailor: "Teamtailor",
  other: "Другая",
};
