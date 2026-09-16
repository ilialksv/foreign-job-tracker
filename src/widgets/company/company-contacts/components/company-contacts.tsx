import { ContactRow } from "@/features/company/contact-row/components/contact-row";
import { Section } from "@/shared/components/layouts/section";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useCompanyContacts } from "../hooks/use-company-contacts";
import { CompanyContactForm } from "./company-contact-form";

export type CompanyContactsProps = {
  companyId: string;
};

export const CompanyContacts = ({ companyId }: CompanyContactsProps) => {
  const { contacts, handleRemove, isLoading } = useCompanyContacts({
    companyId,
  });

  return (
    <Section title="Контакты" meta={contacts.length} divided>
      <div className="flex flex-col gap-3 flex flex-col gap-3">
        {isLoading ? (
          <CompanyContactsSkeleton />
        ) : contacts.length === 0 ? (
          <p className="max-w-prose text-[13px] text-muted">
            Пока никого. Инженер и нанимающий появятся сами после шага
            «Разведка».
          </p>
        ) : (
          <div className="flex flex-col">
            {contacts.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

        <CompanyContactForm companyId={companyId} />
      </div>
    </Section>
  );
};

export const CompanyContactsSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);
