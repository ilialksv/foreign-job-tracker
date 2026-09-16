import type {
  TemplateAudience,
  TemplateLang,
  TemplateScenario,
} from "@/shared/types/entities";

export const TEMPLATE_SCENARIO_LABELS: Record<TemplateScenario, string> = {
  connect_note: "Записка к коннекту",
  referral_request: "Просьба о реферале",
  no_vacancy: "Когда вакансий нет",
  follow_up_1: "Follow-up 1",
  follow_up_2: "Follow-up 2",
  full_message: "Полное сообщение после коннекта",
  proof_of_work: "Proof-of-work",
  thank_you: "Письмо после этапа",
  custom: "Своё",
};

export const TEMPLATE_AUDIENCE_LABELS: Record<TemplateAudience, string> = {
  engineer: "Инженеру",
  hiring: "Нанимающему",
  recruiter: "Рекрутеру",
  any: "Любому",
};

export const TEMPLATE_LANG_LABELS: Record<TemplateLang, string> = {
  ru: "RU",
  en: "EN",
};
