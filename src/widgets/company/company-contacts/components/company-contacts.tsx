import { ContactRow } from "@/features/company/contact-row/components/contact-row";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>Контакты</CardTitle>
        <span className="text-muted text-xs">{contacts.length}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading ? (
          <CompanyContactsSkeleton />
        ) : contacts.length === 0 ? (
          <p className="text-muted text-sm">
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
      </CardContent>
    </Card>
  );
};

export const CompanyContactsSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);
