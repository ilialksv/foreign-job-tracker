import { Trash2 } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/shared/components/ui/button";
import type { Note } from "@/shared/types/entities";
import { formatDateTime } from "@/shared/utils/dates";

export type CompanyNoteRowProps = {
  note: Note;
  onRemove: (params: { id: string }) => void;
};

export const CompanyNoteRow = ({ note, onRemove }: CompanyNoteRowProps) => {
  const handleRemoveClick = useCallback(() => {
    onRemove({ id: note.id });
  }, [note.id, onRemove]);

  return (
    <div className="border-line flex items-start justify-between gap-3 border-b py-2 last:border-b-0">
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-ink text-sm whitespace-pre-wrap">{note.body}</p>
        <span className="text-muted text-xs">
          {formatDateTime(note.createdAt)}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        icon={<Trash2 />}
        onClick={handleRemoveClick}
        aria-label="Удалить заметку"
      />
    </div>
  );
};
