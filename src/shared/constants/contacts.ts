import type { BadgeTone } from "@/shared/constants/company";
import type {
  ContactLanguage,
  ContactRole,
  ContactStatus,
} from "@/shared/types/entities";

export const CONTACT_ROLE_LABELS: Record<ContactRole, string> = {
  engineer: "Инженер",
  hiring: "Нанимающий",
  recruiter: "Рекрутер",
  other: "Другое",
};

export const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  none: "Не писали",
  invite_sent: "Отправлен коннект",
  connected: "Коннект принят",
  replied: "Ответил",
  no_reply: "Без ответа",
};

export const CONTACT_STATUS_TONES: Record<ContactStatus, BadgeTone> = {
  none: "outline",
  invite_sent: "warn",
  connected: "accent",
  replied: "ok",
  no_reply: "neutral",
};

export const CONTACT_LANGUAGE_LABELS: Record<ContactLanguage, string> = {
  ru: "Русский",
  en: "English",
};

export const CONTACT_ROLE_ORDER: ContactRole[] = [
  "engineer",
  "hiring",
  "recruiter",
  "other",
];

export const CONTACT_LANGUAGE_ORDER: ContactLanguage[] = ["en", "ru"];
