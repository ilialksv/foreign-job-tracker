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
      className="border-line flex flex-col gap-3 border-t pt-3"
    >
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
