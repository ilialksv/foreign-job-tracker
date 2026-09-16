import type { StepDefinition } from "../types";

export const FLOW_STEPS: StepDefinition[] = [
  {
    key: "triage",
    title: "Триаж",
    hint: "Проверь стоп-сигналы: требование жить в ОАЭ, арабский, вилка ниже AED 15 000, 8+ лет опыта, hiring freeze.",
    order: 10,
    creation: "initial",
    dependsOn: [],
    fields: [
      {
        key: "stopSignal",
        label: "Какой стоп-сигнал нашёлся",
        type: "text",
        placeholder: "Заполнять только если компания отпадает",
      },
    ],
    options: [
      {
        value: "clear",
        label: "Стоп-сигналов нет",
        tone: "primary",
        effects: [],
      },
      {
        value: "stopped",
        label: "Есть стоп-сигнал",
        tone: "danger",
        effects: [{ type: "close_company", status: "excluded" }],
      },
    ],
  },
  {
    key: "audience",
    title: "Кому писать",
    hint: "LinkedIn → компания → People → Engineering. Размер инженерной команды решает, кому идёт сообщение.",
    order: 20,
    creation: "initial",
    dependsOn: ["triage"],
    fields: [],
    options: [
      {
        value: "gt200",
        label: "200+ инженеров — только инженеру",
        effects: [
          { type: "set_engineering_size", size: "gt200" },
          { type: "skip_step", stepKey: "connect_hiring" },
        ],
      },
      {
        value: "from50to200",
        label: "50–200 — инженеру и нанимающему",
        effects: [{ type: "set_engineering_size", size: "from50to200" }],
      },
      {
        value: "lt50",
        label: "До 50 — нанимающий это CTO или основатель",
        effects: [{ type: "set_engineering_size", size: "lt50" }],
      },
    ],
  },
  {
    key: "recon",
    title: "Разведка",
    hint: "Открой их продукт на пять минут. Нужна деталь, которую нельзя подставить макросом, плюс стек, ATS и два человека.",
    order: 30,
    creation: "initial",
    dependsOn: ["audience"],
    fields: [
      {
        key: "productDetail",
        label: "Деталь про продукт",
        type: "textarea",
        placeholder:
          "Конкретная фича, редизайн, доклад их инженера, их опенсорс",
        hint: "Эта строка подставится в шаблоны как {{productDetail}}",
      },
      {
        key: "stack",
        label: "Стек",
        type: "text",
        placeholder: "React, Next.js, GraphQL",
      },
      {
        key: "ats",
        label: "ATS",
        type: "text",
        placeholder: "Greenhouse / Workable / Lever / Ashby",
      },
      {
        key: "engineerUrl",
        label: "LinkedIn инженера",
        type: "url",
        placeholder: "https://www.linkedin.com/in/...",
        hint: "Контакт создастся автоматически",
      },
      {
        key: "engineerName",
        label: "Имя инженера",
        type: "text",
        placeholder: "Как обращаться в записке",
      },
      {
        key: "hiringUrl",
        label: "LinkedIn нанимающего",
        type: "url",
        placeholder: "https://www.linkedin.com/in/...",
      },
      { key: "hiringName", label: "Имя нанимающего", type: "text" },
      {
        key: "hasRussianSpeakers",
        label: "В команде есть русскоязычные",
        type: "checkbox",
      },
    ],
    options: [
      { value: "done", label: "Разведка готова", tone: "primary", effects: [] },
    ],
  },
  {
    key: "apply",
    title: "Отклик",
    hint: "Резюме с заголовком дословно под вакансию. Откликаться через careers или ATS, не через Easy Apply. Cover letter заполнять даже если optional.",
    order: 40,
    creation: "initial",
    dependsOn: ["recon"],
    fields: [
      { key: "vacancyUrl", label: "Ссылка на вакансию", type: "url" },
      { key: "vacancyTitle", label: "Название вакансии", type: "text" },
      {
        key: "channel",
        label: "Через что откликнулся",
        type: "text",
        placeholder: "careers / Greenhouse / Ashby",
      },
    ],
    options: [
      {
        value: "applied",
        label: "Откликнулся",
        tone: "primary",
        effects: [{ type: "mark_vacancy_applied" }],
      },
      { value: "no_vacancy", label: "Вакансий нет — пропустить", effects: [] },
    ],
  },
  {
    key: "connect_engineer",
    title: "Коннект инженеру",
    hint: "Записка несёт просьбу сразу: реферал. 120–180 символов. За нанятого по рефералу платят AED 2 000–10 000 — это не одолжение.",
    order: 50,
    creation: "initial",
    dependsOn: ["recon"],
    templateScenario: "connect_note",
    fields: [
      { key: "profileUrl", label: "Профиль инженера", type: "url" },
      { key: "noteText", label: "Текст записки", type: "textarea" },
    ],
    options: [
      {
        value: "sent",
        label: "Отправил",
        tone: "primary",
        effects: [
          {
            type: "set_contact_status",
            role: "engineer",
            status: "invite_sent",
          },
          { type: "schedule_step", stepKey: "follow_up_1", inDays: 5 },
        ],
      },
      { value: "not_found", label: "Человека не нашёл", effects: [] },
    ],
  },
  {
    key: "connect_hiring",
    title: "Коннект нанимающему",
    hint: "Есть вакансия — «откликнулся сегодня, есть 15 минут?». Вакансии нет — «в пайплайн до публикации». Русскоязычным пиши по-русски.",
    order: 60,
    creation: "initial",
    dependsOn: ["recon"],
    templateScenario: "connect_note",
    fields: [
      { key: "profileUrl", label: "Профиль нанимающего", type: "url" },
      { key: "noteText", label: "Текст записки", type: "textarea" },
    ],
    options: [
      {
        value: "sent",
        label: "Отправил",
        tone: "primary",
        effects: [
          { type: "set_contact_status", role: "hiring", status: "invite_sent" },
          { type: "schedule_step", stepKey: "follow_up_1", inDays: 5 },
        ],
      },
      { value: "not_found", label: "Человека не нашёл", effects: [] },
    ],
  },
  {
    key: "follow_up_1",
    title: "Follow-up 1",
    hint: "Короткий, без нового содержания.",
    order: 70,
    creation: "on_demand",
    dependsOn: [],
    templateScenario: "follow_up_1",
    fields: [{ key: "messageText", label: "Что отправил", type: "textarea" }],
    options: [
      {
        value: "replied",
        label: "Ответили",
        tone: "primary",
        effects: [
          { type: "set_company_status", status: "responded" },
          { type: "schedule_step", stepKey: "screening_prep", inDays: 0 },
        ],
      },
      {
        value: "connected_silent",
        label: "Коннект приняли, но молчат",
        effects: [
          { type: "schedule_step", stepKey: "full_message", inDays: 0 },
        ],
      },
      {
        value: "silence",
        label: "Тишина",
        effects: [{ type: "schedule_step", stepKey: "follow_up_2", inDays: 6 }],
      },
    ],
  },
  {
    key: "full_message",
    title: "Полное сообщение",
    hint: "Коннект приняли — теперь можно написать развёрнуто. Это бонус-ход, не обязательный шаг.",
    order: 75,
    creation: "on_demand",
    dependsOn: [],
    templateScenario: "full_message",
    fields: [{ key: "messageText", label: "Что отправил", type: "textarea" }],
    options: [
      {
        value: "sent",
        label: "Отправил",
        tone: "primary",
        effects: [{ type: "schedule_step", stepKey: "follow_up_2", inDays: 6 }],
      },
    ],
  },
  {
    key: "follow_up_2",
    title: "Follow-up 2 — последний",
    hint: "Третьего follow-up не бывает. Оставь контакты и закрой вежливо.",
    order: 80,
    creation: "on_demand",
    dependsOn: [],
    templateScenario: "follow_up_2",
    fields: [{ key: "messageText", label: "Что отправил", type: "textarea" }],
    options: [
      {
        value: "replied",
        label: "Ответили",
        tone: "primary",
        effects: [
          { type: "set_company_status", status: "responded" },
          { type: "schedule_step", stepKey: "screening_prep", inDays: 0 },
        ],
      },
      {
        value: "silence",
        label: "Тишина — закрыть",
        effects: [
          { type: "close_company", status: "dormant", reviveInWeeks: 9 },
        ],
      },
    ],
  },
  {
    key: "proof_of_work",
    title: "Proof-of-work",
    hint: "Lighthouse, Network, размер бандла, axe на медленной сети. 3–5 находок с цифрами, одна страница, публичная ссылка. Тон — любопытство, не аудит.",
    order: 85,
    creation: "on_demand",
    dependsOn: [],
    templateScenario: "proof_of_work",
    fields: [
      { key: "linkUrl", label: "Ссылка на разбор", type: "url" },
      { key: "findings", label: "Находки", type: "textarea" },
    ],
    options: [
      { value: "sent", label: "Отправил", tone: "primary", effects: [] },
    ],
  },
  {
    key: "screening_prep",
    title: "Подготовка к скринингу",
    hint: "Открыть answer-bank до звонка. Вилку первым не называть, при прямом вопросе — диапазон в AED в месяц. Сразу спросить про gross/net, пакет и визу.",
    order: 90,
    creation: "on_demand",
    dependsOn: [],
    fields: [
      {
        key: "callDate",
        label: "Когда звонок",
        type: "text",
        placeholder: "17.09, 15:00",
      },
      {
        key: "answersReady",
        label: "Ответы на типовые вопросы готовы",
        type: "checkbox",
      },
      { key: "salaryReady", label: "Вилка в AED посчитана", type: "checkbox" },
      {
        key: "visaReady",
        label: "Вопросы про визу и релокацию записаны",
        type: "checkbox",
      },
    ],
    options: [
      {
        value: "ready",
        label: "Готов к звонку",
        tone: "primary",
        effects: [
          { type: "schedule_step", stepKey: "thank_you_letter", inDays: 0 },
        ],
      },
    ],
  },
  {
    key: "thank_you_letter",
    title: "Письмо после этапа",
    hint: "В тот же день. Три предложения: спасибо, одна конкретная мысль из разговора, подтверждение интереса.",
    order: 100,
    creation: "on_demand",
    dependsOn: [],
    templateScenario: "thank_you",
    fields: [{ key: "messageText", label: "Что отправил", type: "textarea" }],
    options: [
      {
        value: "sent",
        label: "Отправил",
        tone: "primary",
        effects: [{ type: "set_company_status", status: "interviewing" }],
      },
    ],
  },
  {
    key: "revive",
    title: "Реанимация",
    hint: "Прошло около двух месяцев. Проверь, появились ли вакансии и сменился ли состав команды.",
    order: 110,
    creation: "on_demand",
    dependsOn: [],
    fields: [],
    options: [
      {
        value: "restart",
        label: "Вернуть в работу",
        tone: "primary",
        effects: [
          { type: "set_company_status", status: "active" },
          { type: "schedule_step", stepKey: "recon", inDays: 0 },
        ],
      },
      {
        value: "drop",
        label: "Закрыть окончательно",
        tone: "danger",
        effects: [{ type: "close_company", status: "rejected" }],
      },
    ],
  },
];

export const getStepDefinition = (params: { stepKey: string | null }) =>
  FLOW_STEPS.find((step) => step.key === params.stepKey) ?? null;

export const getInitialSteps = () =>
  FLOW_STEPS.filter((step) => step.creation === "initial");
