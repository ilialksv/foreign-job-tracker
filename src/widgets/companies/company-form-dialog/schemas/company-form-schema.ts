import { z } from "@/lib/zod";
import {
  optionalTextSchema,
  optionalUrlSchema,
  requiredEnumSchema,
  requiredTextSchema,
} from "@/lib/zod/schemas/common";
import { COMPANY_DEPTH_ORDER } from "@/shared/constants/company";
import { COUNTRIES } from "@/shared/constants/countries";

const COUNTRY_CODES = COUNTRIES.map((country) => country.code);

export const companyFormSchema = z.object({
  name: requiredTextSchema({
    min: 2,
    max: 120,
    message: "Название компании обязательно",
  }),
  countryCode: requiredEnumSchema({
    values: COUNTRY_CODES,
    message: "Выберите страну",
  }),
  depth: requiredEnumSchema({
    values: COMPANY_DEPTH_ORDER,
    message: "Выберите глубину проработки",
  }),
  queueTier: optionalTextSchema({ max: 120 }),
  info: optionalTextSchema({ max: 4000 }),
  website: optionalUrlSchema(),
  careersUrl: optionalUrlSchema(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
