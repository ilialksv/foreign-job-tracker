import { VacancyRow } from "@/features/company/vacancy-row/components/vacancy-row";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useCompanyVacancies } from "../hooks/use-company-vacancies";
import { CompanyVacancyForm } from "./company-vacancy-form";

export type CompanyVacanciesProps = {
  companyId: string;
};

export const CompanyVacancies = ({ companyId }: CompanyVacanciesProps) => {
  const { handleRemove, isLoading, vacancies } = useCompanyVacancies({
    companyId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вакансии</CardTitle>
        <span className="text-muted text-xs">{vacancies.length}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading ? (
          <CompanyVacanciesSkeleton />
        ) : vacancies.length === 0 ? (
          <p className="text-muted text-sm">
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

        <CompanyVacancyForm companyId={companyId} />
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
