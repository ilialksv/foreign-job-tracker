import { Plus } from "lucide-react";

import { ON_DEMAND_STEPS } from "@/lib/pipeline";

import { useCompanyStepForm } from "../hooks/use-company-step-form";

export type CompanyStepFormProps = {
  companyId: string;
};

const STEP_OPTIONS = ON_DEMAND_STEPS.map((step) => ({
  value: step.key,
  label: step.title,
}));

export const CompanyStepForm = ({ companyId }: CompanyStepFormProps) => {
  const { form, isPending, onFormSubmit } = useCompanyStepForm({ companyId });

  return (
    <form onSubmit={onFormSubmit} noValidate className="flex flex-col gap-2">
      <span className="text-muted text-xs font-medium tracking-wide uppercase">
        Шаг воронки
      </span>
      <div className="grid items-end gap-2 sm:grid-cols-[1fr_auto]">
        <form.AppField name="stepKey">
          {(field) => (
            <field.SelectField
              options={STEP_OPTIONS}
              placeholder="Выбрать шаг"
            />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton icon={<Plus />} disabled={isPending}>
            Добавить шаг
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
};
