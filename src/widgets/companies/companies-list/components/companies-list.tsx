import { Plus } from "lucide-react";

import {
  CompanyRow,
  CompanyRowSkeleton,
} from "@/features/company/company-row/components/company-row";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
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
    hasActiveFilters,
    isCreateOpen,
    isLoading,
    openTasksByCompany,
    statusOptions,
    totalCount,
  } = useCompaniesList();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CompaniesFilters
          filters={filters}
          statusOptions={statusOptions}
          hasActiveFilters={hasActiveFilters}
          onChange={handleFilterChange}
          onReset={handleResetFiltersClick}
        />
        <Button variant="primary" icon={<Plus />} onClick={handleCreateClick}>
          Компания
        </Button>
      </div>

      <p className="font-mono text-[12px] text-muted tabular-nums">
        {companies.length} из {totalCount}
      </p>

      {isLoading ? (
        <CompaniesListSkeleton />
      ) : companies.length === 0 ? (
        <Plug
          title="Ничего не нашлось"
          description="Смягчи фильтры, добавь компанию вручную или импортируй список CSV в настройках."
        />
      ) : (
        <Card className="overflow-hidden">
          {companies.map((company) => (
            <CompanyRow
              key={company.id}
              company={company}
              openTasksCount={openTasksByCompany.get(company.id) ?? 0}
            />
          ))}
        </Card>
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
  <Card className="overflow-hidden">
    <ItemsList
      count={8}
      renderItem={(index) => <CompanyRowSkeleton key={index} />}
    />
  </Card>
);
