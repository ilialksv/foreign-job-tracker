import { Plus } from "lucide-react";

import { VacancyRow } from "@/features/company/vacancy-row/components/vacancy-row";
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
import { VACANCY_SOURCE_LABELS } from "@/shared/constants/vacancies";

import { useCompanyVacancies } from "../hooks/use-company-vacancies";

export type CompanyVacanciesProps = {
  companyId: string;
};

const SOURCE_OPTIONS = Object.entries(VACANCY_SOURCE_LABELS).map(
  ([value, label]) => ({ value, label }),
);

export const CompanyVacancies = ({ companyId }: CompanyVacanciesProps) => {
  const {
    handleAddClick,
    handleFieldChange,
    handleRemove,
    isLoading,
    isPending,
    vacancies,
    values,
  } = useCompanyVacancies({ companyId });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вакансии</CardTitle>
        <span className="text-xs text-muted">{vacancies.length}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading ? (
          <CompanyVacanciesSkeleton />
        ) : vacancies.length === 0 ? (
          <p className="text-sm text-muted">
            Вакансий нет. Шаг «Отклик» можно пропустить, остальное делается так
            же.
          </p>
        ) : (
          <div className="flex flex-col">
            {vacancies.map((vacancy) => (
              <VacancyRow
                key={vacancy.id}
                vacancy={vacancy}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

        <div className="grid gap-2 border-t border-line pt-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            name="title"
            value={values.title}
            onChange={handleFieldChange}
            placeholder="Senior Frontend Engineer"
          />
          <Input
            name="url"
            value={values.url}
            onChange={handleFieldChange}
            placeholder="https://"
            className="lg:col-span-2"
          />
          <Select
            name="source"
            value={values.source}
            options={SOURCE_OPTIONS}
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
            Добавить вакансию
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const CompanyVacanciesSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);
