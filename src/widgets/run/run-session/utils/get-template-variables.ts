import type { StepDefinition } from "@/lib/pipeline";
import type {
  Company,
  Contact,
  ContactRole,
  Settings,
  Task,
  Vacancy,
} from "@/shared/types/entities";
import type { TemplateVariables } from "@/shared/utils/fill-template";

const ROLE_BY_STEP: Record<string, ContactRole> = {
  connect_engineer: "engineer",
  connect_hiring: "hiring",
};

export const getStepContact = (params: {
  step: StepDefinition | null;
  contacts: Contact[];
  companyId: string;
}) => {
  const companyContacts = params.contacts.filter(
    (contact) => contact.companyId === params.companyId,
  );

  if (!params.step) {
    return companyContacts[0] ?? null;
  }

  const role = ROLE_BY_STEP[params.step.key];

  if (!role) {
    return companyContacts[0] ?? null;
  }

  return companyContacts.find((contact) => contact.role === role) ?? null;
};

const readAnswer = (params: {
  tasks: Task[];
  stepKey: string;
  key: string;
}) => {
  const task = params.tasks.find((item) => item.stepKey === params.stepKey);
  const value = task?.answers[params.key];

  return typeof value === "string" && value.length > 0 ? value : null;
};

export const getTemplateVariables = (params: {
  company: Company;
  companyTasks: Task[];
  contact: Contact | null;
  vacancies: Vacancy[];
  settings: Settings | undefined;
}): TemplateVariables => {
  const vacancy =
    params.vacancies.find(
      (item) =>
        item.companyId === params.company.id && item.status !== "closed",
    ) ?? null;

  return {
    company: params.company.name,
    contactName: params.contact?.name ?? "",
    vacancyTitle:
      vacancy?.title ??
      readAnswer({
        tasks: params.companyTasks,
        stepKey: "apply",
        key: "vacancyTitle",
      }) ??
      "",
    vacancyUrl:
      vacancy?.url ??
      readAnswer({
        tasks: params.companyTasks,
        stepKey: "apply",
        key: "vacancyUrl",
      }) ??
      "",
    productDetail: readAnswer({
      tasks: params.companyTasks,
      stepKey: "recon",
      key: "productDetail",
    }),
    myName: params.settings?.profile.fullName ?? "",
    portfolioUrl: params.settings?.profile.portfolioUrl ?? "",
  };
};
