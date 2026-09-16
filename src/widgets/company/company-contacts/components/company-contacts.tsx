import { Plus } from "lucide-react";

import { ContactRow } from "@/features/company/contact-row/components/contact-row";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  CONTACT_LANGUAGE_LABELS,
  CONTACT_ROLE_LABELS,
} from "@/shared/constants/contacts";

import { useCompanyContacts } from "../hooks/use-company-contacts";

export type CompanyContactsProps = {
  companyId: string;
};

const ROLE_OPTIONS = Object.entries(CONTACT_ROLE_LABELS).map(
  ([value, label]) => ({ value, label }),
);

const LANGUAGE_OPTIONS = Object.entries(CONTACT_LANGUAGE_LABELS).map(
  ([value, label]) => ({ value, label }),
);

export const CompanyContacts = ({ companyId }: CompanyContactsProps) => {
  const {
    contacts,
    handleAddClick,
    handleFieldChange,
    handleRemove,
    isLoading,
    isPending,
    values,
  } = useCompanyContacts({ companyId });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Контакты</CardTitle>
        <span className="text-xs text-muted">{contacts.length}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading ? (
          <CompanyContactsSkeleton />
        ) : contacts.length === 0 ? (
          <p className="text-sm text-muted">
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

        <div className="grid gap-2 border-t border-line pt-3 sm:grid-cols-2 lg:grid-cols-5">
          <Input
            name="name"
            value={values.name}
            onChange={handleFieldChange}
            placeholder="Имя"
          />
          <Select
            name="role"
            value={values.role}
            options={ROLE_OPTIONS}
            onChange={handleFieldChange}
          />
          <Input
            name="linkedinUrl"
            value={values.linkedinUrl}
            onChange={handleFieldChange}
            placeholder="https://www.linkedin.com/in/..."
            className="lg:col-span-2"
          />
          <Select
            name="language"
            value={values.language}
            options={LANGUAGE_OPTIONS}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <Button
            size="sm"
            icon={<Plus />}
            disabled={isPending}
            onClick={handleAddClick}
          >
            Добавить контакт
          </Button>
        </div>
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
