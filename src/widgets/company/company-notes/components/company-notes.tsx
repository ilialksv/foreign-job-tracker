import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Textarea } from "@/shared/components/ui/textarea";

import { useCompanyNotes } from "../hooks/use-company-notes";
import { CompanyNoteRow } from "./company-note-row";

export type CompanyNotesProps = {
  companyId: string;
};

export const CompanyNotes = ({ companyId }: CompanyNotesProps) => {
  const {
    body,
    handleAddClick,
    handleBodyChange,
    handleRemoveClick,
    isLoading,
    isPending,
    notes,
  } = useCompanyNotes({ companyId });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Заметки</CardTitle>
        <span className="text-xs text-muted">{notes.length}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading ? (
          <CompanyNotesSkeleton />
        ) : (
          <div className="flex flex-col">
            {notes.map((note) => (
              <CompanyNoteRow
                key={note.id}
                note={note}
                onRemove={handleRemoveClick}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-line pt-3">
          <Textarea
            value={body}
            rows={3}
            onChange={handleBodyChange}
            placeholder="Что важно помнить про эту компанию"
          />
          <div>
            <Button size="sm" disabled={isPending} onClick={handleAddClick}>
              Сохранить заметку
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CompanyNotesSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
  </div>
);
