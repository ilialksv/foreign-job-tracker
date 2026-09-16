import { useCallback, useMemo } from "react";

import { useGetNotes } from "@/actions/notes/hooks/use-get-notes";
import { useRemoveNote } from "@/actions/notes/hooks/use-remove-note";

export const useCompanyNotes = (params: { companyId: string }) => {
  const notesQuery = useGetNotes();
  const removeNote = useRemoveNote();

  const notes = useMemo(
    () =>
      (notesQuery.data ?? [])
        .filter((note) => note.companyId === params.companyId)
        .sort((left, right) => (left.createdAt < right.createdAt ? 1 : -1)),
    [notesQuery.data, params.companyId],
  );

  const handleRemoveClick = useCallback(
    (removeParams: { id: string }) => {
      removeNote.mutate({ id: removeParams.id });
    },
    [removeNote],
  );

  return { handleRemoveClick, isLoading: notesQuery.isLoading, notes };
};
