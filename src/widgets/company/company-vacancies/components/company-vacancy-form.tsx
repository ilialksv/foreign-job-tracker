import { Plus } from "lucide-react";

import { useCompanyVacancyForm } from "../hooks/use-company-vacancy-form";
import { CompanyVacancyFormFields } from "./company-vacancy-form-fields";

export type CompanyVacancyFormProps = {
  companyId: string;
};

export const CompanyVacancyForm = ({ companyId }: CompanyVacancyFormProps) => {
  const { form, isPending, onFormSubmit } = useCompanyVacancyForm({
    companyId,
  });

  return (
    <form
      onSubmit={onFormSubmit}
      noValidate
      className="flex flex-col gap-2.5 rounded-(--radius-control) bg-surface-2 px-3 py-3"
    >
      <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
        Новая вакансия
      </span>
      <CompanyVacancyFormFields form={form} />
      <div>
        <form.AppForm>
          <form.SubmitButton size="sm" icon={<Plus />} disabled={isPending}>
            Добавить вакансию
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
};
