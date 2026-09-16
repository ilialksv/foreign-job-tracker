import { withForm } from "@/lib/tanstack-form";
import {
  VACANCY_SOURCE_LABELS,
  VACANCY_SOURCE_ORDER,
} from "@/shared/constants/vacancies";

import type { CompanyVacancyFormValues } from "../schemas/company-vacancy-form-schema";

const SOURCE_OPTIONS = VACANCY_SOURCE_ORDER.map((source) => ({
  value: source,
  label: VACANCY_SOURCE_LABELS[source],
}));

export const CompanyVacancyFormFields = withForm({
  defaultValues: {} as CompanyVacancyFormValues,
  render: ({ form }) => (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <form.AppField name="title">
        {(field) => (
          <field.InputField
            label="Название"
            placeholder="Senior Frontend Engineer"
            autoComplete="off"
          />
        )}
      </form.AppField>
      <form.AppField name="url">
        {(field) => (
          <field.InputField
            label="Ссылка"
            placeholder="https://"
            fieldLayoutProps={{ className: "lg:col-span-2" }}
          />
        )}
      </form.AppField>
      <form.AppField name="source">
        {(field) => (
          <field.SelectField label="Источник" options={SOURCE_OPTIONS} />
        )}
      </form.AppField>
    </div>
  ),
});
