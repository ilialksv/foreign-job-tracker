export type BaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type CompanyStatus =
  | "queued"
  | "active"
  | "waiting"
  | "responded"
  | "interviewing"
  | "offer"
  | "rejected"
  | "dormant"
  | "excluded";

export type CompanyDepth = "quick" | "standard" | "deep";

export type EngineeringSize = "lt50" | "from50to200" | "gt200" | "unknown";

export type AtsKind =
  | "greenhouse"
  | "workable"
  | "lever"
  | "ashby"
  | "teamtailor"
  | "other";

export type Company = BaseEntity & {
  name: string;
  countryCode: string;
  city: string | null;
  website: string | null;
  careersUrl: string | null;
  ats: AtsKind | null;
  queueTier: string | null;
  depth: CompanyDepth;
  engineeringSize: EngineeringSize;
  hasRussianSpeakers: boolean | null;
  stack: string[];
  info: string;
  tags: string[];
  status: CompanyStatus;
  excludeReason: string | null;
  reviveAt: string | null;
  lastTouchAt: string | null;
  archivedAt: string | null;
};

export type ContactRole = "engineer" | "hiring" | "recruiter" | "other";

export type ContactStatus =
  | "none"
  | "invite_sent"
  | "connected"
  | "replied"
  | "no_reply";

export type ContactLanguage = "ru" | "en";

export type Contact = BaseEntity & {
  companyId: string;
  name: string;
  role: ContactRole;
  title: string | null;
  linkedinUrl: string | null;
  language: ContactLanguage;
  status: ContactStatus;
  lastTouchAt: string | null;
  notes: string | null;
};

export type VacancySource = "careers" | "linkedin" | "job_board" | "other";

export type VacancyStatus = "open" | "applied" | "rejected" | "closed";

export type Vacancy = BaseEntity & {
  companyId: string;
  title: string;
  url: string | null;
  source: VacancySource;
  status: VacancyStatus;
  foundAt: string;
  appliedAt: string | null;
};

export type TaskKind = "stage" | "custom";

export type TaskStatus = "todo" | "in_progress" | "done" | "skipped";

export type TaskAnswerValue = string | boolean | null;

export type TaskAnswers = Record<string, TaskAnswerValue>;

export type Task = BaseEntity & {
  companyId: string | null;
  kind: TaskKind;
  stepKey: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueAt: string | null;
  dependsOn: string[];
  order: number;
  answers: TaskAnswers;
  outcome: string | null;
  createdBy: "system" | "user";
  completedAt: string | null;
};

export type EventType =
  | "step_done"
  | "step_skipped"
  | "status_changed"
  | "note"
  | "applied"
  | "message_sent";

export type CompanyEvent = BaseEntity & {
  companyId: string;
  type: EventType;
  title: string;
  details: string | null;
};

export type Note = BaseEntity & {
  companyId: string;
  body: string;
  pinned: boolean;
};

export type TemplateLang = "ru" | "en";

export type TemplateAudience = "engineer" | "hiring" | "recruiter" | "any";

export type TemplateScenario =
  | "connect_note"
  | "referral_request"
  | "no_vacancy"
  | "follow_up_1"
  | "follow_up_2"
  | "full_message"
  | "proof_of_work"
  | "thank_you"
  | "custom";

export type Template = BaseEntity & {
  title: string;
  lang: TemplateLang;
  audience: TemplateAudience;
  scenario: TemplateScenario;
  body: string;
  isBuiltIn: boolean;
};

export type Settings = BaseEntity & {
  profile: {
    fullName: string;
    linkedinUrl: string;
    portfolioUrl: string;
    cvUrl: string;
  };
  goals: {
    companiesPerWeek: number;
  };
  followUp: {
    firstDays: number;
    secondDays: number;
    reviveWeeks: number;
  };
  defaultCountryCode: string;
};
