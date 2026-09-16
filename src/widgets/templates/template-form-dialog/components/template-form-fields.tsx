import { withForm } from "@/lib/tanstack-form";
import {
  TEMPLATE_AUDIENCE_LABELS,
  TEMPLATE_AUDIENCE_ORDER,
  TEMPLATE_SCENARIO_LABELS,
  TEMPLATE_SCENARIO_ORDER,
} from "@/shared/constants/templates";

import type { TemplateFormValues } from "../schemas/template-form-schema";

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
        {(field) => <field.InputField
            label="Название"
            placeholder="Коннект инженеру"
            autoComplete="off"
          />}
      </form.AppField>

      <div className="grid gap-3 sm:grid-cols-2">
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

      <form.AppField name="bodyEn">
        {(field) => <field.TextareaField
            label="Текст · English"
            placeholder="Hi {{contactName}}, I applied for {{vacancyTitle}} at {{company}}..."
            rows={8}
          />}
      </form.AppField>
      <form.AppField name="bodyRu">
        {(field) => <field.TextareaField
            label="Текст · Русский"
            placeholder="Привет, {{contactName}}! Откликнулся на {{vacancyTitle}} в {{company}}..."
            rows={8}
          />}
      </form.AppField>
    </div>
  ),
});
