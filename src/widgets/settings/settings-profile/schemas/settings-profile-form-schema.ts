import { z } from "@/lib/zod";
import {
  numericTextSchema,
  optionalTextSchema,
  optionalUrlSchema,
  requiredEnumSchema,
} from "@/lib/zod/schemas/common";
import { COUNTRIES } from "@/shared/constants/countries";

const COUNTRY_CODES = COUNTRIES.map((country) => country.code);

export const settingsProfileFormSchema = z.object({
  fullName: optionalTextSchema({ max: 120 }),
  linkedinUrl: optionalUrlSchema(),
  portfolioUrl: optionalUrlSchema(),
  cvUrl: optionalUrlSchema(),
  companiesPerWeek: numericTextSchema({ min: 1, max: 50 }),
  firstDays: numericTextSchema({ min: 1, max: 60 }),
  secondDays: numericTextSchema({ min: 1, max: 60 }),
  reviveWeeks: numericTextSchema({ min: 1, max: 52 }),
  defaultCountryCode: requiredEnumSchema({
    values: COUNTRY_CODES,
    message: "Выберите страну",
  }),
});

export type SettingsProfileFormValues = z.infer<
  typeof settingsProfileFormSchema
>;
