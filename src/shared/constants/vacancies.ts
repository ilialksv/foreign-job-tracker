import type { BadgeTone } from "@/shared/constants/company";
import type { VacancySource, VacancyStatus } from "@/shared/types/entities";

export const VACANCY_SOURCE_LABELS: Record<VacancySource, string> = {
  careers: "Careers-страница",
  linkedin: "LinkedIn",
  job_board: "Джоб-борд",
  other: "Другое",
};

export const VACANCY_STATUS_LABELS: Record<VacancyStatus, string> = {
  open: "Открыта",
  applied: "Откликнулся",
  rejected: "Отказ",
  closed: "Закрыта",
};

export const VACANCY_STATUS_TONES: Record<VacancyStatus, BadgeTone> = {
  open: "accent",
  applied: "ok",
  rejected: "danger",
  closed: "neutral",
};
