import { toast } from "sonner";

import { useCreateContact } from "@/actions/contacts/hooks/use-create-contact";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import { COMPANY_CONTACT_FORM_DEFAULT_VALUES } from "../schemas/company-contact-form-schema";
import { companyContactFormValidateFn } from "../utils/company-contact-form-helpers";

export const useCompanyContactForm = (params: { companyId: string }) => {
  const createContact = useCreateContact();

  const form = useAppForm({
    defaultValues: COMPANY_CONTACT_FORM_DEFAULT_VALUES,
    validators: {
      onChange: companyContactFormValidateFn,
      onSubmit: companyContactFormValidateFn,
    },
    onSubmit: ({ value, formApi }) => {
      createContact.mutate(
        {
          data: {
            companyId: params.companyId,
            name: value.name.trim(),
            role: value.role,
            title: null,
            linkedinUrl: value.linkedinUrl.trim() || null,
            language: value.language,
            status: "none",
            lastTouchAt: null,
            notes: null,
          },
        },
        {
          onSuccess: () => {
            formApi.reset();
            toast.success("Контакт добавлен");
          },
          onError: () => {
            toast.error("Не получилось добавить контакт");
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return { form, isPending: createContact.isPending, onFormSubmit };
};
