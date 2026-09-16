import { useCallback, useMemo } from "react";

import { useGetContacts } from "@/actions/contacts/hooks/use-get-contacts";
import { useRemoveContact } from "@/actions/contacts/hooks/use-remove-contact";

export const useCompanyContacts = (params: { companyId: string }) => {
  const contactsQuery = useGetContacts();
  const removeContact = useRemoveContact();

  const contacts = useMemo(
    () =>
      (contactsQuery.data ?? []).filter(
        (contact) => contact.companyId === params.companyId,
      ),
    [contactsQuery.data, params.companyId],
  );

  const handleRemove = useCallback(
    (removeParams: { id: string }) => {
      removeContact.mutate({ id: removeParams.id });
    },
    [removeContact],
  );

  return { contacts, handleRemove, isLoading: contactsQuery.isLoading };
};
