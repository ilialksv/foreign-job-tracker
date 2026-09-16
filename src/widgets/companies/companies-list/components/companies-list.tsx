import { Plus } from "lucide-react";

import {
  CompanyCard,
  CompanyCardSkeleton,
} from "@/features/company/company-card/components/company-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { CompanyFormDialog } from "@/widgets/companies/company-form-dialog/components/company-form-dialog";

import { useCompaniesList } from "../hooks/use-companies-list";
import { CompaniesFilters } from "./companies-filters";

export const CompaniesList = () => {
  const {
    companies,
    defaultCountryCode,
    filters,
    handleCreateClick,
    handleCreateClose,
    handleFilterChange,
    handleResetFiltersClick,
    isCreateOpen,
    isLoading,
    openTasksByCompany,
    statusOptions,
    totalCount,
  } = useCompaniesList();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-muted">
          Показано {companies.length} из {totalCount}
        </span>
        <Button variant="primary" icon={<Plus />} onClick={handleCreateClick}>
          Добавить компанию
        </Button>
      </div>

      <CompaniesFilters
        filters={filters}
        statusOptions={statusOptions}
        onChange={handleFilterChange}
        onReset={handleResetFiltersClick}
      />

      {isLoading ? (
        <CompaniesListSkeleton />
      ) : companies.length === 0 ? (
        <Plug
          title="Компаний нет"
          description="Добавь компанию вручную или импортируй список CSV в настройках."
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              openTasksCount={openTasksByCompany.get(company.id) ?? 0}
            />
          ))}
        </div>
      )}

      {isCreateOpen ? (
        <CompanyFormDialog
          company={null}
          defaultCountryCode={defaultCountryCode}
          onClose={handleCreateClose}
        />
      ) : null}
    </div>
  );
};

export const CompaniesListSkeleton = () => (
  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
    <ItemsList
      count={6}
      renderItem={(index) => <CompanyCardSkeleton key={index} />}
    />
  </div>
);
