import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useCreateVacancy } from "@/actions/vacancies/hooks/use-create-vacancy";
import { useGetVacancies } from "@/actions/vacancies/hooks/use-get-vacancies";
import { useRemoveVacancy } from "@/actions/vacancies/hooks/use-remove-vacancy";
import type { VacancySource } from "@/shared/types/entities";
import { nowIso } from "@/shared/utils/dates";

type VacancyFormValues = {
  title: string;
  url: string;
  source: VacancySource;
};

const INITIAL_VALUES: VacancyFormValues = {
  title: "",
  url: "",
  source: "careers",
};

export const useCompanyVacancies = (params: { companyId: string }) => {
  const [values, setValues] = useState<VacancyFormValues>(INITIAL_VALUES);

  const vacanciesQuery = useGetVacancies();
  const createVacancy = useCreateVacancy();
  const removeVacancy = useRemoveVacancy();

  const vacancies = useMemo(
    () =>
      (vacanciesQuery.data ?? []).filter(
        (vacancy) => vacancy.companyId === params.companyId,
      ),
    [params.companyId, vacanciesQuery.data],
  );

  const handleFieldChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      setValues((previous) => ({ ...previous, [name]: value }));
    },
    [],
  );

  const handleAddClick = useCallback(() => {
    if (values.title.trim().length === 0) {
      toast.error("Название вакансии обязательно");

      return;
    }

    createVacancy.mutate(
      {
        data: {
          companyId: params.companyId,
          title: values.title.trim(),
          url: values.url.trim() || null,
          source: values.source,
          status: "open",
          foundAt: nowIso(),
          appliedAt: null,
        },
      },
      {
        onSuccess: () => {
          setValues(INITIAL_VALUES);
          toast.success("Вакансия добавлена");
        },
      },
    );
  }, [createVacancy, params.companyId, values]);

  const handleRemove = useCallback(
    (removeParams: { id: string }) => {
      removeVacancy.mutate({ id: removeParams.id });
    },
    [removeVacancy],
  );

  return {
    handleAddClick,
    handleFieldChange,
    handleRemove,
    isLoading: vacanciesQuery.isLoading,
    isPending: createVacancy.isPending,
    vacancies,
    values,
  };
};
