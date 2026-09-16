import { toast } from "sonner";

import { useCreateNote } from "@/actions/notes/hooks/use-create-note";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import { COMPANY_NOTE_FORM_DEFAULT_VALUES } from "../schemas/company-note-form-schema";
import { companyNoteFormValidateFn } from "../utils/company-note-form-helpers";

export const useCompanyNoteForm = (params: { companyId: string }) => {
  const createNote = useCreateNote();

  const form = useAppForm({
    defaultValues: COMPANY_NOTE_FORM_DEFAULT_VALUES,
    validators: {
      onChange: companyNoteFormValidateFn,
      onSubmit: companyNoteFormValidateFn,
    },
    onSubmit: ({ value, formApi }) => {
      createNote.mutate(
        {
          data: {
            companyId: params.companyId,
            body: value.body.trim(),
            pinned: false,
          },
        },
        {
          onSuccess: () => {
            formApi.reset();
            toast.success("Заметка сохранена");
          },
          onError: () => {
            toast.error("Не получилось сохранить заметку");
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return { form, isPending: createNote.isPending, onFormSubmit };
};
