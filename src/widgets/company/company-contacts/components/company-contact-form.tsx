import { Plus } from "lucide-react";

import { useCompanyContactForm } from "../hooks/use-company-contact-form";
import { CompanyContactFormFields } from "./company-contact-form-fields";

export type CompanyContactFormProps = {
  companyId: string;
};

export const CompanyContactForm = ({ companyId }: CompanyContactFormProps) => {
  const { form, isPending, onFormSubmit } = useCompanyContactForm({
    companyId,
  });

  return (
    <form
      onSubmit={onFormSubmit}
      noValidate
      className="flex flex-col gap-2.5 rounded-(--radius-control) bg-surface-2 px-3 py-3"
    >
      <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
        Новый контакт
      </span>
      <CompanyContactFormFields form={form} />
      <div>
        <form.AppForm>
          <form.SubmitButton size="sm" icon={<Plus />} disabled={isPending}>
            Добавить контакт
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
};
