import { withForm } from "@/lib/tanstack-form";
import { COUNTRIES } from "@/shared/constants/countries";

import type { SettingsProfileFormValues } from "../schemas/settings-profile-form-schema";

const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  value: country.code,
  label: country.label,
}));

export const SettingsProfileFormFields = withForm({
  defaultValues: {} as SettingsProfileFormValues,
  render: ({ form }) => (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <form.AppField name="fullName">
          {(field) => (
            <field.InputField
              label="Имя для подписи"
              hint="Подставляется как {{myName}}"
              autoComplete="off"
            />
          )}
        </form.AppField>
        <form.AppField name="linkedinUrl">
          {(field) => (
            <field.InputField label="LinkedIn" placeholder="https://" />
          )}
        </form.AppField>
        <form.AppField name="portfolioUrl">
          {(field) => (
            <field.InputField
              label="Портфолио"
              hint="Подставляется как {{portfolioUrl}}"
              placeholder="https://"
            />
          )}
        </form.AppField>
        <form.AppField name="cvUrl">
          {(field) => (
            <field.InputField label="Ссылка на резюме" placeholder="https://" />
          )}
        </form.AppField>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <form.AppField name="companiesPerWeek">
          {(field) => (
            <field.InputField label="Компаний в неделю" inputMode="numeric" />
          )}
        </form.AppField>
        <form.AppField name="firstDays">
          {(field) => (
            <field.InputField label="Follow-up 1, дней" inputMode="numeric" />
          )}
        </form.AppField>
        <form.AppField name="secondDays">
          {(field) => (
            <field.InputField label="Follow-up 2, дней" inputMode="numeric" />
          )}
        </form.AppField>
        <form.AppField name="reviveWeeks">
          {(field) => (
            <field.InputField label="Реанимация, недель" inputMode="numeric" />
          )}
        </form.AppField>
        <form.AppField name="defaultCountryCode">
          {(field) => (
            <field.SelectField
              label="Страна по умолчанию"
              options={COUNTRY_OPTIONS}
            />
          )}
        </form.AppField>
      </div>
    </div>
  ),
});
