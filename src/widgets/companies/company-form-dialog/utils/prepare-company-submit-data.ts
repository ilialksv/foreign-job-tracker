import type { CreateInput, UpdateInput } from "@/lib/storage/types";
import type { Company } from "@/shared/types/entities";

import type { CompanyFormValues } from "../schemas/company-form-schema";

const toNullable = (value: string) => {
  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
};

export const prepareCompanyUpdateData = (params: {
  values: CompanyFormValues;
}): UpdateInput<Company> => ({
  name: params.values.name.trim(),
  countryCode: params.values.countryCode,
  depth: params.values.depth,
  queueTier: toNullable(params.values.queueTier),
  info: params.values.info.trim(),
  website: toNullable(params.values.website),
  careersUrl: toNullable(params.values.careersUrl),
});

export const prepareCompanyCreateData = (params: {
  values: CompanyFormValues;
}): CreateInput<Company> => ({
  name: params.values.name.trim(),
  countryCode: params.values.countryCode,
  depth: params.values.depth,
  queueTier: toNullable(params.values.queueTier),
  info: params.values.info.trim(),
  website: toNullable(params.values.website),
  careersUrl: toNullable(params.values.careersUrl),
  city: null,
  ats: null,
  engineeringSize: "unknown",
  hasRussianSpeakers: null,
  stack: [],
  tags: [],
  status: "queued",
  excludeReason: null,
  reviveAt: null,
  lastTouchAt: null,
  archivedAt: null,
});
