import type {
  BaseEntity,
  Company,
  CompanyStatus,
  ContactRole,
  ContactStatus,
  EngineeringSize,
  EventType,
  Task,
  TaskAnswers,
  TemplateScenario,
} from "@/shared/types/entities";

export type StepFieldType = "text" | "textarea" | "url" | "checkbox";

export type StepField = {
  key: string;
  label: string;
  type: StepFieldType;
  placeholder?: string;
  hint?: string;
  /** Поле обязательно при любом исходе шага. */
  required?: boolean;
};

export type StepEffect =
  | { type: "skip_step"; stepKey: string }
  | { type: "schedule_step"; stepKey: string; inDays: number }
  | { type: "set_company_status"; status: CompanyStatus }
  | { type: "set_engineering_size"; size: EngineeringSize }
  | { type: "set_contact_status"; role: ContactRole; status: ContactStatus }
  | { type: "mark_vacancy_applied" }
  | { type: "close_company"; status: CompanyStatus; reviveInWeeks?: number };

export type StepOptionTone = "primary" | "neutral" | "danger";

export type StepOption = {
  value: string;
  label: string;
  tone?: StepOptionTone;
  /** Поля, обязательные именно для этого исхода. */
  requiredFields?: string[];
  effects: StepEffect[];
};

export type StepCreation = "initial" | "on_demand";

export type StepDefinition = {
  key: string;
  title: string;
  hint: string;
  order: number;
  creation: StepCreation;
  dependsOn: string[];
  templateScenario?: TemplateScenario;
  fields: StepField[];
  options: StepOption[];
};

export type TaskDraft = Omit<Task, keyof BaseEntity> & { id?: string };

export type TaskPatch = Partial<Omit<Task, keyof BaseEntity>>;

export type CompanyPatch = Partial<Omit<Company, keyof BaseEntity>>;

export type ContactStatusUpdate = {
  role: ContactRole;
  status: ContactStatus;
};

export type PipelineEventDraft = {
  type: EventType;
  title: string;
  details: string | null;
};

export type PipelinePatch = {
  taskUpdates: { id: string; data: TaskPatch }[];
  tasksToCreate: TaskDraft[];
  companyPatch: CompanyPatch | null;
  contactUpdates: ContactStatusUpdate[];
  markVacancyApplied: boolean;
  events: PipelineEventDraft[];
};

export type ApplyOutcomeParams = {
  step: StepDefinition;
  option: StepOption;
  task: Task;
  company: Company;
  tasks: Task[];
  answers: TaskAnswers;
};
