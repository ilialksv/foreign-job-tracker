import { withForm } from "@/lib/tanstack-form";
import {
  TEMPLATE_AUDIENCE_LABELS,
  TEMPLATE_AUDIENCE_ORDER,
  TEMPLATE_LANG_LABELS,
  TEMPLATE_LANG_ORDER,
  TEMPLATE_SCENARIO_LABELS,
  TEMPLATE_SCENARIO_ORDER,
} from "@/shared/constants/templates";

import type { TemplateFormValues } from "../schemas/template-form-schema";

const LANG_OPTIONS = TEMPLATE_LANG_ORDER.map((lang) => ({
  value: lang,
  label: TEMPLATE_LANG_LABELS[lang],
}));

const AUDIENCE_OPTIONS = TEMPLATE_AUDIENCE_ORDER.map((audience) => ({
  value: audience,
  label: TEMPLATE_AUDIENCE_LABELS[audience],
}));

const SCENARIO_OPTIONS = TEMPLATE_SCENARIO_ORDER.map((scenario) => ({
  value: scenario,
  label: TEMPLATE_SCENARIO_LABELS[scenario],
}));

export const TemplateFormFields = withForm({
  defaultValues: {} as TemplateFormValues,
  render: ({ form }) => (
    <div className="flex flex-col gap-3">
      <form.AppField name="title">
        {(field) => <field.InputField label="Название" autoComplete="off" />}
      </form.AppField>

      <div className="grid gap-3 sm:grid-cols-3">
        <form.AppField name="lang">
          {(field) => <field.SelectField label="Язык" options={LANG_OPTIONS} />}
        </form.AppField>
        <form.AppField name="audience">
          {(field) => (
            <field.SelectField label="Кому" options={AUDIENCE_OPTIONS} />
          )}
        </form.AppField>
        <form.AppField name="scenario">
          {(field) => (
            <field.SelectField label="Сценарий" options={SCENARIO_OPTIONS} />
          )}
        </form.AppField>
      </div>

      <form.AppField name="body">
        {(field) => <field.TextareaField label="Текст" rows={10} />}
      </form.AppField>
    </div>
  ),
});
