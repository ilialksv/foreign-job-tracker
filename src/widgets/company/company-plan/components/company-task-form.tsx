import { Plus } from "lucide-react";

import { useCompanyTaskForm } from "../hooks/use-company-task-form";

export type CompanyTaskFormProps = {
  companyId: string;
};

export const CompanyTaskForm = ({ companyId }: CompanyTaskFormProps) => {
  const { form, isPending, onFormSubmit } = useCompanyTaskForm({ companyId });

  return (
    <form onSubmit={onFormSubmit} noValidate className="flex flex-col gap-2">
      <span className="text-muted text-xs font-medium tracking-wide uppercase">
        Своя задача
      </span>
      <div className="grid items-end gap-2 sm:grid-cols-[1fr_auto_auto]">
        <form.AppField name="title">
          {(field) => (
            <field.InputField
              placeholder="Например: проверить careers через неделю"
              autoComplete="off"
            />
          )}
        </form.AppField>
        <form.AppField name="dueAt">
          {(field) => <field.InputField type="date" />}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton icon={<Plus />} disabled={isPending}>
            Добавить
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
};
