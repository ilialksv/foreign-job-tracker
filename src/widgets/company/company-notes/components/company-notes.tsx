import { Section } from "@/shared/components/layouts/section";
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
    <Section title="Заметки" meta={notes.length} divided>
      <div className="flex flex-col gap-3 flex flex-col gap-3">
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
      </div>
    </Section>
  );
};

export const CompanyNotesSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
  </div>
);
