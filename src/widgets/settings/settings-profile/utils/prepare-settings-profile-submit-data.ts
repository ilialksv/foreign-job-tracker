import type { UpdateInput } from "@/lib/storage/types";
import type { Settings } from "@/shared/types/entities";

import type { SettingsProfileFormValues } from "../schemas/settings-profile-form-schema";

export const prepareSettingsProfileSubmitData = (params: {
  values: SettingsProfileFormValues;
}): UpdateInput<Settings> => ({
  profile: {
    fullName: params.values.fullName.trim(),
    linkedinUrl: params.values.linkedinUrl.trim(),
    portfolioUrl: params.values.portfolioUrl.trim(),
    cvUrl: params.values.cvUrl.trim(),
  },
  goals: {
    companiesPerWeek: Number(params.values.companiesPerWeek),
  },
  followUp: {
    firstDays: Number(params.values.firstDays),
    secondDays: Number(params.values.secondDays),
    reviveWeeks: Number(params.values.reviveWeeks),
  },
  defaultCountryCode: params.values.defaultCountryCode,
});
