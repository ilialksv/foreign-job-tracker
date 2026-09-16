import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useUpdateSettings } from "@/actions/settings/hooks/use-update-settings";
import type { Settings } from "@/shared/types/entities";

export type SettingsProfileValues = {
  fullName: string;
  linkedinUrl: string;
  portfolioUrl: string;
  cvUrl: string;
  companiesPerWeek: string;
  firstDays: string;
  secondDays: string;
  reviveWeeks: string;
  defaultCountryCode: string;
};

const toValues = (settings: Settings): SettingsProfileValues => ({
  fullName: settings.profile.fullName,
  linkedinUrl: settings.profile.linkedinUrl,
  portfolioUrl: settings.profile.portfolioUrl,
  cvUrl: settings.profile.cvUrl,
  companiesPerWeek: String(settings.goals.companiesPerWeek),
  firstDays: String(settings.followUp.firstDays),
  secondDays: String(settings.followUp.secondDays),
  reviveWeeks: String(settings.followUp.reviveWeeks),
  defaultCountryCode: settings.defaultCountryCode,
});

const toNumber = (params: { value: string; fallback: number }) => {
  const parsed = Number(params.value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : params.fallback;
};

export const useSettingsProfileForm = (params: { settings: Settings }) => {
  const [values, setValues] = useState<SettingsProfileValues>(() =>
    toValues(params.settings),
  );

  const updateSettings = useUpdateSettings();

  const handleFieldChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      setValues((previous) => ({ ...previous, [name]: value }));
    },
    [],
  );

  const handleSubmitClick = useCallback(() => {
    updateSettings.mutate(
      {
        data: {
          profile: {
            fullName: values.fullName.trim(),
            linkedinUrl: values.linkedinUrl.trim(),
            portfolioUrl: values.portfolioUrl.trim(),
            cvUrl: values.cvUrl.trim(),
          },
          goals: {
            companiesPerWeek: toNumber({
              value: values.companiesPerWeek,
              fallback: 10,
            }),
          },
          followUp: {
            firstDays: toNumber({ value: values.firstDays, fallback: 5 }),
            secondDays: toNumber({ value: values.secondDays, fallback: 6 }),
            reviveWeeks: toNumber({ value: values.reviveWeeks, fallback: 9 }),
          },
          defaultCountryCode: values.defaultCountryCode,
        },
      },
      {
        onSuccess: () => {
          toast.success("Настройки сохранены");
        },
      },
    );
  }, [updateSettings, values]);

  return {
    handleFieldChange,
    handleSubmitClick,
    isPending: updateSettings.isPending,
    values,
  };
};
