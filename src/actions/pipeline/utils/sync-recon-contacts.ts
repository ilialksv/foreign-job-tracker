import { contactsRepository } from "@/lib/storage/repositories";
import type {
  Contact,
  ContactRole,
  TaskAnswers,
} from "@/shared/types/entities";

const readText = (params: { answers: TaskAnswers; key: string }) => {
  const value = params.answers[params.key];

  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
};

const ROLE_FIELDS: { role: ContactRole; urlKey: string; nameKey: string }[] = [
  { role: "engineer", urlKey: "engineerUrl", nameKey: "engineerName" },
  { role: "hiring", urlKey: "hiringUrl", nameKey: "hiringName" },
];

export const syncReconContacts = async (params: {
  companyId: string;
  answers: TaskAnswers;
  contacts: Contact[];
}) => {
  const companyContacts = params.contacts.filter(
    (contact) => contact.companyId === params.companyId,
  );

  for (const field of ROLE_FIELDS) {
    const url = readText({ answers: params.answers, key: field.urlKey });
    const name = readText({ answers: params.answers, key: field.nameKey });

    if (!url && !name) {
      continue;
    }

    const existing = companyContacts.find(
      (contact) => contact.role === field.role,
    );

    if (existing) {
      await contactsRepository.update({
        id: existing.id,
        data: {
          name: name ?? existing.name,
          linkedinUrl: url ?? existing.linkedinUrl,
        },
      });

      continue;
    }

    await contactsRepository.create({
      data: {
        companyId: params.companyId,
        name: name ?? "Без имени",
        role: field.role,
        title: null,
        linkedinUrl: url,
        language: "en",
        status: "none",
        lastTouchAt: null,
        notes: null,
      },
    });
  }
};
