import type { Settings } from "@/shared/types/entities";

import { useSettingsProfileForm } from "../hooks/use-settings-profile-form";
import { SettingsProfileFormFields } from "./settings-profile-form-fields";

export type SettingsProfileFormProps = {
  settings: Settings;
};

const SETTINGS_PROFILE_FORM_ID = "settings-profile-form";

export const SettingsProfileForm = ({ settings }: SettingsProfileFormProps) => {
  const { form, isPending, onFormSubmit } = useSettingsProfileForm({
    settings,
  });

  return (
    <form
      id={SETTINGS_PROFILE_FORM_ID}
      onSubmit={onFormSubmit}
      noValidate
      className="flex flex-col gap-4"
    >
      <SettingsProfileFormFields form={form} />
      <div className="flex gap-2">
        <form.AppForm>
          <form.SubmitButton disabled={isPending}>Сохранить</form.SubmitButton>
        </form.AppForm>
        <form.AppForm>
          <form.ResetButton>Сбросить</form.ResetButton>
        </form.AppForm>
      </div>
    </form>
  );
};
