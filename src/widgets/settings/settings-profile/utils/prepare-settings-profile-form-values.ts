import type { Settings } from "@/shared/types/entities";

import type { SettingsProfileFormValues } from "../schemas/settings-profile-form-schema";

export const prepareSettingsProfileFormValues = (params: {
  settings: Settings;
}): SettingsProfileFormValues => ({
  fullName: params.settings.profile.fullName,
  linkedinUrl: params.settings.profile.linkedinUrl,
  portfolioUrl: params.settings.profile.portfolioUrl,
  cvUrl: params.settings.profile.cvUrl,
  companiesPerWeek: String(params.settings.goals.companiesPerWeek),
  firstDays: String(params.settings.followUp.firstDays),
  secondDays: String(params.settings.followUp.secondDays),
  reviveWeeks: String(params.settings.followUp.reviveWeeks),
  defaultCountryCode: params.settings.defaultCountryCode,
});
