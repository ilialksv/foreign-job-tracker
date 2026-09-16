import { withForm } from "@/lib/tanstack-form";
import {
  CONTACT_LANGUAGE_LABELS,
  CONTACT_LANGUAGE_ORDER,
  CONTACT_ROLE_LABELS,
  CONTACT_ROLE_ORDER,
} from "@/shared/constants/contacts";

import type { CompanyContactFormValues } from "../schemas/company-contact-form-schema";

const ROLE_OPTIONS = CONTACT_ROLE_ORDER.map((role) => ({
  value: role,
  label: CONTACT_ROLE_LABELS[role],
}));

const LANGUAGE_OPTIONS = CONTACT_LANGUAGE_ORDER.map((language) => ({
  value: language,
  label: CONTACT_LANGUAGE_LABELS[language],
}));

export const CompanyContactFormFields = withForm({
  defaultValues: {} as CompanyContactFormValues,
  render: ({ form }) => (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <form.AppField name="name">
        {(field) => (
          <field.InputField
            label="Имя"
            placeholder="Имя контакта"
            autoComplete="off"
          />
        )}
      </form.AppField>
      <form.AppField name="role">
        {(field) => <field.SelectField label="Роль" options={ROLE_OPTIONS} />}
      </form.AppField>
      <form.AppField name="linkedinUrl">
        {(field) => (
          <field.InputField
            label="LinkedIn"
            placeholder="https://www.linkedin.com/in/..."
          />
        )}
      </form.AppField>
      <form.AppField name="language">
        {(field) => (
          <field.SelectField label="Язык" options={LANGUAGE_OPTIONS} />
        )}
      </form.AppField>
    </div>
  ),
});
