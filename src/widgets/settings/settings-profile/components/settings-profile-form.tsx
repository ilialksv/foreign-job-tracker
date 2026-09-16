import { Button } from "@/shared/components/ui/button";
import { Field } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { COUNTRIES } from "@/shared/constants/countries";
import type { Settings } from "@/shared/types/entities";

import { useSettingsProfileForm } from "../hooks/use-settings-profile-form";

export type SettingsProfileFormProps = {
  settings: Settings;
};

const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  value: country.code,
  label: country.label,
}));

export const SettingsProfileForm = ({ settings }: SettingsProfileFormProps) => {
  const { handleFieldChange, handleSubmitClick, isPending, values } =
    useSettingsProfileForm({ settings });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Имя для подписи" hint="Подставляется как {{myName}}">
          <Input
            name="fullName"
            value={values.fullName}
            onChange={handleFieldChange}
          />
        </Field>
        <Field label="LinkedIn">
          <Input
            name="linkedinUrl"
            value={values.linkedinUrl}
            onChange={handleFieldChange}
            placeholder="https://"
          />
        </Field>
        <Field label="Портфолио" hint="Подставляется как {{portfolioUrl}}">
          <Input
            name="portfolioUrl"
            value={values.portfolioUrl}
            onChange={handleFieldChange}
            placeholder="https://"
          />
        </Field>
        <Field label="Ссылка на резюме">
          <Input
            name="cvUrl"
            value={values.cvUrl}
            onChange={handleFieldChange}
            placeholder="https://"
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Field label="Компаний в неделю">
          <Input
            name="companiesPerWeek"
            type="number"
            min={1}
            value={values.companiesPerWeek}
            onChange={handleFieldChange}
          />
        </Field>
        <Field label="Follow-up 1, дней">
          <Input
            name="firstDays"
            type="number"
            min={1}
            value={values.firstDays}
            onChange={handleFieldChange}
          />
        </Field>
        <Field label="Follow-up 2, дней">
          <Input
            name="secondDays"
            type="number"
            min={1}
            value={values.secondDays}
            onChange={handleFieldChange}
          />
        </Field>
        <Field label="Реанимация, недель">
          <Input
            name="reviveWeeks"
            type="number"
            min={1}
            value={values.reviveWeeks}
            onChange={handleFieldChange}
          />
        </Field>
        <Field label="Страна по умолчанию">
          <Select
            name="defaultCountryCode"
            value={values.defaultCountryCode}
            options={COUNTRY_OPTIONS}
            onChange={handleFieldChange}
          />
        </Field>
      </div>

      <div>
        <Button
          variant="primary"
          disabled={isPending}
          onClick={handleSubmitClick}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
