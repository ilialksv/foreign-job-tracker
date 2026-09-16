import { useCompanyNoteForm } from "../hooks/use-company-note-form";

export type CompanyNoteFormProps = {
  companyId: string;
};

export const CompanyNoteForm = ({ companyId }: CompanyNoteFormProps) => {
  const { form, isPending, onFormSubmit } = useCompanyNoteForm({ companyId });

  return (
    <form
      onSubmit={onFormSubmit}
      noValidate
      className="flex flex-col gap-2.5 rounded-(--radius-control) bg-surface-2 px-3 py-3"
    >
      <form.AppField name="body">
        {(field) => (
          <field.TextareaField
            rows={3}
            placeholder="Что важно помнить про эту компанию"
          />
        )}
      </form.AppField>
      <div>
        <form.AppForm>
          <form.SubmitButton disabled={isPending}>
            Сохранить заметку
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
};
