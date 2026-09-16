import { z } from "@/lib/zod";
import {
  optionalUrlSchema,
  requiredEnumSchema,
  requiredTextSchema,
} from "@/lib/zod/schemas/common";
import {
  CONTACT_LANGUAGE_ORDER,
  CONTACT_ROLE_ORDER,
} from "@/shared/constants/contacts";

export const companyContactFormSchema = z.object({
  name: requiredTextSchema({
    min: 2,
    max: 120,
    message: "Имя контакта обязательно",
  }),
  role: requiredEnumSchema({
    values: CONTACT_ROLE_ORDER,
    message: "Выберите роль",
  }),
  linkedinUrl: optionalUrlSchema(),
  language: requiredEnumSchema({
    values: CONTACT_LANGUAGE_ORDER,
    message: "Выберите язык",
  }),
});

export type CompanyContactFormValues = z.infer<typeof companyContactFormSchema>;

export const COMPANY_CONTACT_FORM_DEFAULT_VALUES: CompanyContactFormValues = {
  name: "",
  role: "engineer",
  linkedinUrl: "",
  language: "en",
};
