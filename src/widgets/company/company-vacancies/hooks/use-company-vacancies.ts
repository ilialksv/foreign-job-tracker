import { useCallback, useMemo } from "react";

import { useGetVacancies } from "@/actions/vacancies/hooks/use-get-vacancies";
import { useRemoveVacancy } from "@/actions/vacancies/hooks/use-remove-vacancy";

export const useCompanyVacancies = (params: { companyId: string }) => {
  const vacanciesQuery = useGetVacancies();
  const removeVacancy = useRemoveVacancy();

  const vacancies = useMemo(
    () =>
      (vacanciesQuery.data ?? []).filter(
        (vacancy) => vacancy.companyId === params.companyId,
      ),
    [params.companyId, vacanciesQuery.data],
  );

  const handleRemove = useCallback(
    (removeParams: { id: string }) => {
      removeVacancy.mutate({ id: removeParams.id });
    },
    [removeVacancy],
  );

  return { handleRemove, isLoading: vacanciesQuery.isLoading, vacancies };
};
