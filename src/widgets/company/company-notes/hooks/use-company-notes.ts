import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useCreateNote } from "@/actions/notes/hooks/use-create-note";
import { useGetNotes } from "@/actions/notes/hooks/use-get-notes";
import { useRemoveNote } from "@/actions/notes/hooks/use-remove-note";

export const useCompanyNotes = (params: { companyId: string }) => {
  const [body, setBody] = useState("");

  const notesQuery = useGetNotes();
  const createNote = useCreateNote();
  const removeNote = useRemoveNote();

  const notes = useMemo(
    () =>
      (notesQuery.data ?? [])
        .filter((note) => note.companyId === params.companyId)
        .sort((left, right) => (left.createdAt < right.createdAt ? 1 : -1)),
    [notesQuery.data, params.companyId],
  );

  const handleBodyChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setBody(event.target.value);
    },
    [],
  );

  const handleAddClick = useCallback(() => {
    if (body.trim().length === 0) {
      return;
    }

    createNote.mutate(
      {
        data: {
          companyId: params.companyId,
          body: body.trim(),
          pinned: false,
        },
      },
      {
        onSuccess: () => {
          setBody("");
          toast.success("Заметка сохранена");
        },
      },
    );
  }, [body, createNote, params.companyId]);

  const handleRemoveClick = useCallback(
    (removeParams: { id: string }) => {
      removeNote.mutate({ id: removeParams.id });
    },
    [removeNote],
  );

  return {
    body,
    handleAddClick,
    handleBodyChange,
    handleRemoveClick,
    isLoading: notesQuery.isLoading,
    isPending: createNote.isPending,
    notes,
  };
};
