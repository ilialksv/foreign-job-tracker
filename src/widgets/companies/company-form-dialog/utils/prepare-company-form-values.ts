import type { Company } from "@/shared/types/entities";

import type { CompanyFormValues } from "../schemas/company-form-schema";

export const prepareCompanyFormValues = (params: {
  company: Company | null;
  defaultCountryCode: string;
}): CompanyFormValues => ({
  name: params.company?.name ?? "",
  countryCode: params.company?.countryCode ?? params.defaultCountryCode,
  depth: params.company?.depth ?? "standard",
  queueTier: params.company?.queueTier ?? "",
  info: params.company?.info ?? "",
  website: params.company?.website ?? "",
  careersUrl: params.company?.careersUrl ?? "",
});
