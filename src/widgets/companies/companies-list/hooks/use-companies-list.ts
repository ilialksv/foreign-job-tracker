import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";

import { useGetCompanies } from "@/actions/companies/hooks/use-get-companies";
import { useGetSettings } from "@/actions/settings/hooks/use-get-settings";
import { useGetTasks } from "@/actions/tasks/hooks/use-get-tasks";
import { isTaskOpen } from "@/lib/pipeline";
import type { CompanyStatus } from "@/shared/types/entities";

export type CompaniesFiltersState = {
  query: string;
  countryCode: string;
  status: string;
};

const INITIAL_FILTERS: CompaniesFiltersState = {
  query: "",
  countryCode: "",
  status: "",
};

export const useCompaniesList = () => {
  const [filters, setFilters] =
    useState<CompaniesFiltersState>(INITIAL_FILTERS);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const companiesQuery = useGetCompanies();
  const tasksQuery = useGetTasks();
  const settingsQuery = useGetSettings();

  const openTasksByCompany = useMemo(() => {
    const counts = new Map<string, number>();

    (tasksQuery.data ?? []).forEach((task) => {
      if (!task.companyId || !isTaskOpen({ task })) {
        return;
      }

      counts.set(task.companyId, (counts.get(task.companyId) ?? 0) + 1);
    });

    return counts;
  }, [tasksQuery.data]);

  const companies = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return (companiesQuery.data ?? [])
      .filter((company) => company.archivedAt === null)
      .filter((company) =>
        normalizedQuery.length === 0
          ? true
          : company.name.toLowerCase().includes(normalizedQuery) ||
            company.info.toLowerCase().includes(normalizedQuery),
      )
      .filter((company) =>
        filters.countryCode.length === 0
          ? true
          : company.countryCode === filters.countryCode,
      )
      .filter((company) =>
        filters.status.length === 0 ? true : company.status === filters.status,
      )
      .sort((left, right) => {
        const leftTier = left.queueTier ?? "";
        const rightTier = right.queueTier ?? "";

        if (leftTier !== rightTier) {
          return leftTier.localeCompare(rightTier);
        }

        return left.name.localeCompare(right.name);
      });
  }, [companiesQuery.data, filters]);

  const handleFilterChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      setFilters((previous) => ({ ...previous, [name]: value }));
    },
    [],
  );

  const handleResetFiltersClick = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const handleCreateClick = useCallback(() => {
    setIsCreateOpen(true);
  }, []);

  const handleCreateClose = useCallback(() => {
    setIsCreateOpen(false);
  }, []);

  const statusOptions = useMemo(() => {
    const used = new Set<CompanyStatus>(
      (companiesQuery.data ?? []).map((company) => company.status),
    );

    return Array.from(used);
  }, [companiesQuery.data]);

  const hasActiveFilters = useMemo(
    () =>
      filters.query.length > 0 ||
      filters.countryCode.length > 0 ||
      filters.status.length > 0,
    [filters],
  );

  return {
    companies,
    defaultCountryCode: settingsQuery.data?.defaultCountryCode ?? "AE",
    filters,
    handleCreateClick,
    handleCreateClose,
    handleFilterChange,
    handleResetFiltersClick,
    hasActiveFilters,
    isCreateOpen,
    isLoading: companiesQuery.isLoading || tasksQuery.isLoading,
    openTasksByCompany,
    statusOptions,
    totalCount: (companiesQuery.data ?? []).length,
  };
};
