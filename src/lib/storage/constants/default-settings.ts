import type { Settings } from "@/shared/types/entities";
import { nowIso } from "@/shared/utils/dates";

export const SETTINGS_DOCUMENT_ID = "settings";

export const createDefaultSettings = (): Settings => {
  const timestamp = nowIso();

  return {
    id: SETTINGS_DOCUMENT_ID,
    createdAt: timestamp,
    updatedAt: timestamp,
    profile: {
      fullName: "",
      linkedinUrl: "",
      portfolioUrl: "",
      cvUrl: "",
    },
    goals: {
      companiesPerWeek: 10,
    },
    followUp: {
      firstDays: 5,
      secondDays: 6,
      reviveWeeks: 9,
    },
    defaultCountryCode: "AE",
  };
};
