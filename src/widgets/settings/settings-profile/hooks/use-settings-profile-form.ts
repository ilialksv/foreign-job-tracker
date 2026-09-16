import { toast } from "sonner";

import { useUpdateSettings } from "@/actions/settings/hooks/use-update-settings";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import type { Settings } from "@/shared/types/entities";

import { prepareSettingsProfileFormValues } from "../utils/prepare-settings-profile-form-values";
import { prepareSettingsProfileSubmitData } from "../utils/prepare-settings-profile-submit-data";
import {
  settingsProfileFormMatchValidateFn,
  settingsProfileFormValidateFn,
} from "../utils/settings-profile-form-helpers";

export const useSettingsProfileForm = (params: { settings: Settings }) => {
  const updateSettings = useUpdateSettings();

  const form = useAppForm({
    defaultValues: prepareSettingsProfileFormValues({
      settings: params.settings,
    }),
    validators: {
      onChange: settingsProfileFormValidateFn,
      onSubmit: settingsProfileFormMatchValidateFn,
    },
    onSubmit: ({ value, formApi }) => {
      updateSettings.mutate(
        { data: prepareSettingsProfileSubmitData({ values: value }) },
        {
          onSuccess: () => {
            formApi.reset(value);
            toast.success("Настройки сохранены");
          },
          onError: () => {
            toast.error("Не получилось сохранить настройки");
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return { form, isPending: updateSettings.isPending, onFormSubmit };
};
