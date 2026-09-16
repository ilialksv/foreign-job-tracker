import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useCompanyNotes } from "../hooks/use-company-notes";
import { CompanyNoteForm } from "./company-note-form";
import { CompanyNoteRow } from "./company-note-row";

export type CompanyNotesProps = {
  companyId: string;
};

export const CompanyNotes = ({ companyId }: CompanyNotesProps) => {
  const { handleRemoveClick, isLoading, notes } = useCompanyNotes({
    companyId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Заметки</CardTitle>
        <span className="text-muted text-xs">{notes.length}</span>
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

        <CompanyNoteForm companyId={companyId} />
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
