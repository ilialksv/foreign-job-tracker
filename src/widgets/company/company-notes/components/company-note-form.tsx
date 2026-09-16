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
      <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
        Новая заметка
      </span>
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
          <form.SubmitButton size="sm" disabled={isPending}>
            Сохранить заметку
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
};
