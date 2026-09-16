import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useCreateContact } from "@/actions/contacts/hooks/use-create-contact";
import { useGetContacts } from "@/actions/contacts/hooks/use-get-contacts";
import { useRemoveContact } from "@/actions/contacts/hooks/use-remove-contact";
import type { ContactLanguage, ContactRole } from "@/shared/types/entities";

type ContactFormValues = {
  name: string;
  role: ContactRole;
  linkedinUrl: string;
  language: ContactLanguage;
};

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  role: "engineer",
  linkedinUrl: "",
  language: "en",
};

export const useCompanyContacts = (params: { companyId: string }) => {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);

  const contactsQuery = useGetContacts();
  const createContact = useCreateContact();
  const removeContact = useRemoveContact();

  const contacts = useMemo(
    () =>
      (contactsQuery.data ?? []).filter(
        (contact) => contact.companyId === params.companyId,
      ),
    [contactsQuery.data, params.companyId],
  );

  const handleFieldChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      setValues((previous) => ({ ...previous, [name]: value }));
    },
    [],
  );

  const handleAddClick = useCallback(() => {
    if (values.name.trim().length === 0) {
      toast.error("Имя обязательно");

      return;
    }

    createContact.mutate(
      {
        data: {
          companyId: params.companyId,
          name: values.name.trim(),
          role: values.role,
          title: null,
          linkedinUrl: values.linkedinUrl.trim() || null,
          language: values.language,
          status: "none",
          lastTouchAt: null,
          notes: null,
        },
      },
      {
        onSuccess: () => {
          setValues(INITIAL_VALUES);
          toast.success("Контакт добавлен");
        },
      },
    );
  }, [createContact, params.companyId, values]);

  const handleRemove = useCallback(
    (removeParams: { id: string }) => {
      removeContact.mutate({ id: removeParams.id });
    },
    [removeContact],
  );

  return {
    contacts,
    handleAddClick,
    handleFieldChange,
    handleRemove,
    isLoading: contactsQuery.isLoading,
    isPending: createContact.isPending,
    values,
  };
};
