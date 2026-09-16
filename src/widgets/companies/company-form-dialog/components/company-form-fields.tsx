import { withForm } from "@/lib/tanstack-form";
import {
  COMPANY_DEPTH_LABELS,
  COMPANY_DEPTH_ORDER,
} from "@/shared/constants/company";
import { COUNTRIES } from "@/shared/constants/countries";

import type { CompanyFormValues } from "../schemas/company-form-schema";

const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  value: country.code,
  label: country.label,
}));

const DEPTH_OPTIONS = COMPANY_DEPTH_ORDER.map((depth) => ({
  value: depth,
  label: COMPANY_DEPTH_LABELS[depth],
}));

export const CompanyFormFields = withForm({
  defaultValues: {} as CompanyFormValues,
  render: ({ form }) => (
    <div className="flex flex-col gap-3">
      <form.AppField name="name">
        {(field) => (
          <field.InputField
            label="Название"
            placeholder="Property Finder"
            autoComplete="off"
          />
        )}
      </form.AppField>

      <div className="grid gap-3 sm:grid-cols-2">
        <form.AppField name="countryCode">
          {(field) => (
            <field.SelectField label="Страна" options={COUNTRY_OPTIONS} />
          )}
        </form.AppField>
        <form.AppField name="depth">
          {(field) => (
            <field.SelectField
              label="Глубина проработки"
              options={DEPTH_OPTIONS}
            />
          )}
        </form.AppField>
      </div>

      <form.AppField name="queueTier">
        {(field) => (
          <field.InputField
            label="Очередь"
            hint="Например: 1 · Живые вакансии"
            placeholder="1 · Живые вакансии"
          />
        )}
      </form.AppField>

      <form.AppField name="info">
        {(field) => (
          <field.TextareaField
            label="Информация"
            placeholder="Что известно про компанию и почему она в списке"
          />
        )}
      </form.AppField>

      <div className="grid gap-3 sm:grid-cols-2">
        <form.AppField name="website">
          {(field) => <field.InputField label="Сайт" placeholder="https://" />}
        </form.AppField>
        <form.AppField name="careersUrl">
          {(field) => (
            <field.InputField label="Careers" placeholder="https://" />
          )}
        </form.AppField>
      </div>
    </div>
  ),
});
