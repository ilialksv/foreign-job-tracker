import type { Template } from "@/shared/types/entities";

import type { CreateInput } from "../types";

export const createBuiltInTemplates = (): CreateInput<Template>[] => [
  {
    title: "Коннект инженеру — просьба о реферале",
    audience: "engineer",
    scenario: "connect_note",
    bodies: {
      en: "Hi {{contactName}}, I applied for {{vacancyTitle}} at {{company}} today. Frontend engineer, 5 years of React and TypeScript. Would you be open to referring me?",
      ru: "Здравствуйте, {{contactName}}. Сегодня откликнулся на {{vacancyTitle}} в {{company}}. Фронтенд, 5 лет на React и TypeScript. Готовы дать реферал?",
    },
    isBuiltIn: true,
  },
  {
    title: "Коннект нанимающему — есть вакансия",
    audience: "hiring",
    scenario: "connect_note",
    bodies: {
      en: "Hi {{contactName}}, I applied for {{vacancyTitle}} at {{company}} today. Frontend engineer, 5 years of React and TypeScript, relocating to the region. Open to 15 minutes this week?",
      ru: "Здравствуйте, {{contactName}}. Сегодня откликнулся на {{vacancyTitle}} в {{company}}. Фронтенд, 5 лет на React и TypeScript, переезжаю в регион. Найдётся 15 минут на этой неделе?",
    },
    isBuiltIn: true,
  },
  {
    title: "Коннект нанимающему — вакансий нет",
    audience: "hiring",
    scenario: "no_vacancy",
    bodies: {
      en: "Hi {{contactName}}, frontend engineer with 5 years of React and TypeScript, relocating to the region. No open frontend role at {{company}} right now — would you keep me in the pipeline for the next one?",
      ru: "Здравствуйте, {{contactName}}. Фронтенд-инженер, 5 лет на React и TypeScript, переезжаю в регион. Открытых фронтенд-вакансий в {{company}} сейчас нет — можно попасть в пайплайн до публикации?",
    },
    isBuiltIn: true,
  },
  {
    title: "Полное сообщение инженеру — реферал",
    audience: "engineer",
    scenario: "referral_request",
    bodies: {
      en: "Thanks for connecting, {{contactName}}.\n\nI am a frontend engineer with 5 years of React and TypeScript, currently applying to {{company}} for {{vacancyTitle}}: {{vacancyUrl}}\n\nWhat drew me in: {{productDetail}}\n\nA referral from your side would put the application in a different queue. If that works for you, I can send anything you need — CV, a short summary, or the exact role link. My work is here: {{portfolioUrl}}\n\nThank you for your time and assistance.\n{{myName}}",
      ru: "Спасибо за коннект, {{contactName}}.\n\nЯ фронтенд-инженер, 5 лет на React и TypeScript, откликнулся в {{company}} на {{vacancyTitle}}: {{vacancyUrl}}\n\nЧем зацепила компания: {{productDetail}}\n\nРеферал с вашей стороны переводит заявку в другую очередь. Если это уместно, пришлю всё, что нужно: резюме, короткую выжимку или ссылку на вакансию. Мои работы здесь: {{portfolioUrl}}\n\nСпасибо за время и помощь.\n{{myName}}",
    },
    isBuiltIn: true,
  },
  {
    title: "Полное сообщение нанимающему",
    audience: "hiring",
    scenario: "full_message",
    bodies: {
      en: "Thanks for connecting, {{contactName}}.\n\nI applied for {{vacancyTitle}} at {{company}} and wanted to give you the short version: 5 years as a frontend engineer, React and TypeScript, product teams with real traffic, and recent production work with LLM-based features.\n\nWhat drew me to {{company}}: {{productDetail}}\n\nI am relocating to the region and am ready for an employment visa process. Would 15 minutes this week work for you?\n\nThank you for your time and assistance.\n{{myName}}",
      ru: "Спасибо за коннект, {{contactName}}.\n\nОткликнулся на {{vacancyTitle}} в {{company}} и хочу коротко про себя: 5 лет во фронтенде, React и TypeScript, продуктовые команды с реальным трафиком, последний год — фичи на LLM в проде.\n\nЧем зацепила {{company}}: {{productDetail}}\n\nПереезжаю в регион и готов к оформлению рабочей визы. Найдётся 15 минут на этой неделе?\n\nСпасибо за время и помощь.\n{{myName}}",
    },
    isBuiltIn: true,
  },
  {
    title: "Follow-up 1 — день 5",
    audience: "any",
    scenario: "follow_up_1",
    bodies: {
      en: "Hi {{contactName}}, following up on my note about {{vacancyTitle}} at {{company}}. Still interested and happy to answer anything about my background.",
      ru: "Здравствуйте, {{contactName}}. Возвращаюсь к сообщению про {{vacancyTitle}} в {{company}}. Интерес в силе, готов ответить на любые вопросы по опыту.",
    },
    isBuiltIn: true,
  },
  {
    title: "Follow-up 2 — последний",
    audience: "any",
    scenario: "follow_up_2",
    bodies: {
      en: "Hi {{contactName}}, last note from me on {{vacancyTitle}} at {{company}}. If the timing is wrong, no problem — my details are here: {{portfolioUrl}}. Happy to talk whenever a frontend role opens up.",
      ru: "Здравствуйте, {{contactName}}. Последнее сообщение от меня про {{vacancyTitle}} в {{company}}. Если сейчас не время — это нормально, мои контакты здесь: {{portfolioUrl}}. Буду рад поговорить, когда откроется фронтенд-вакансия.",
    },
    isBuiltIn: true,
  },
  {
    title: "Proof-of-work — разбор их фронтенда",
    audience: "any",
    scenario: "proof_of_work",
    bodies: {
      en: "Hi {{contactName}}, I spent an evening with {{company}}'s web app out of curiosity and wrote down three frontend findings with numbers — load time, bundle size on the first route, and a rendering detail: {{portfolioUrl}}\n\nNo agenda, just the kind of thing I enjoy digging into. Happy to walk through it if it is useful.",
      ru: "Здравствуйте, {{contactName}}. Из любопытства провёл вечер с веб-приложением {{company}} и собрал три фронтенд-находки с цифрами: время загрузки, вес бандла на первом роуте и деталь рендеринга — {{portfolioUrl}}\n\nБез повестки, просто это то, в чём мне нравится копаться. Готов провести по разбору, если пригодится.",
    },
    isBuiltIn: true,
  },
  {
    title: "Письмо после этапа",
    audience: "any",
    scenario: "thank_you",
    bodies: {
      en: "Thank you for the conversation today. {{productDetail}} was the part that stayed with me, and it lines up with the work I want to be doing next.\n\nMy interest in {{vacancyTitle}} at {{company}} stands, and I am ready for the next step whenever you are.\n\nThank you for your time and assistance.\n{{myName}}",
      ru: "Спасибо за сегодняшний разговор. Больше всего запомнилось: {{productDetail}} — это совпадает с тем, чем хочу заниматься дальше.\n\nИнтерес к {{vacancyTitle}} в {{company}} в силе, готов к следующему шагу, когда будет удобно.\n\nСпасибо за время и помощь.\n{{myName}}",
    },
    isBuiltIn: true,
  },
];
