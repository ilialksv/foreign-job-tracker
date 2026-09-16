import type { Template, TemplateLang } from "@/shared/types/entities";

const LANGS: TemplateLang[] = ["en", "ru"];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readString = (source: Record<string, unknown>, key: string) => {
  const value = source[key];

  return typeof value === "string" ? value : "";
};

const isLegacyTemplate = (value: Record<string, unknown>) =>
  typeof value.lang === "string" && typeof value.body === "string";

const readLang = (value: Record<string, unknown>): TemplateLang =>
  value.lang === "ru" ? "ru" : "en";

const stripLangSuffix = (title: string) =>
  title.replace(/\s*\((?:EN|RU|ENG|РУС)\)\s*$/iu, "").trim();

/**
 * Старая схема хранила по шаблону на язык. Склеиваем пары с одинаковым
 * сценарием и аудиторией в один шаблон с двумя текстами.
 */
export const migrateTemplates = (params: { items: unknown[] }) => {
  const legacyItems = params.items.filter(
    (item) => isRecord(item) && isLegacyTemplate(item),
  );

  if (legacyItems.length === 0) {
    const items = params.items.filter(isRecord).map((item): Template => {
      const bodies = isRecord(item.bodies) ? item.bodies : {};

      return {
        id: readString(item, "id"),
        createdAt: readString(item, "createdAt"),
        updatedAt: readString(item, "updatedAt"),
        title: readString(item, "title"),
        audience: readTemplateAudience(item),
        scenario: readTemplateScenario(item),
        bodies: {
          en: typeof bodies.en === "string" ? bodies.en : "",
          ru: typeof bodies.ru === "string" ? bodies.ru : "",
        },
        isBuiltIn: item.isBuiltIn === true,
      };
    });

    return { changed: false, items };
  }

  const merged = new Map<string, Template>();

  params.items.filter(isRecord).forEach((item) => {
    const scenario = readTemplateScenario(item);
    const audience = readTemplateAudience(item);
    const groupKey = `${scenario}|${audience}|${item.isBuiltIn === true}`;
    const existing = merged.get(groupKey);
    const lang = readLang(item);
    const body = readString(item, "body");

    if (existing) {
      merged.set(groupKey, {
        ...existing,
        bodies: { ...existing.bodies, [lang]: body },
      });

      return;
    }

    const emptyBodies: Record<TemplateLang, string> = { en: "", ru: "" };

    LANGS.forEach((currentLang) => {
      emptyBodies[currentLang] = currentLang === lang ? body : "";
    });

    merged.set(groupKey, {
      id: readString(item, "id"),
      createdAt: readString(item, "createdAt"),
      updatedAt: readString(item, "updatedAt"),
      title: stripLangSuffix(readString(item, "title")),
      audience,
      scenario,
      bodies: emptyBodies,
      isBuiltIn: item.isBuiltIn === true,
    });
  });

  return { changed: true, items: Array.from(merged.values()) };
};

const TEMPLATE_AUDIENCES = ["engineer", "hiring", "recruiter", "any"] as const;

const TEMPLATE_SCENARIOS = [
  "connect_note",
  "referral_request",
  "no_vacancy",
  "follow_up_1",
  "follow_up_2",
  "full_message",
  "proof_of_work",
  "thank_you",
  "custom",
] as const;

const readTemplateAudience = (value: Record<string, unknown>) =>
  TEMPLATE_AUDIENCES.find((audience) => audience === value.audience) ?? "any";

const readTemplateScenario = (value: Record<string, unknown>) =>
  TEMPLATE_SCENARIOS.find((scenario) => scenario === value.scenario) ??
  "custom";
