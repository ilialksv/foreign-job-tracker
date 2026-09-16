import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { COMPANY_STATUS_LABELS } from "@/shared/constants/company";
import { COUNTRIES } from "@/shared/constants/countries";
import type { CompanyStatus } from "@/shared/types/entities";

import type { CompaniesFiltersState } from "../hooks/use-companies-list";

export type CompaniesFiltersProps = {
  filters: CompaniesFiltersState;
  statusOptions: CompanyStatus[];
  hasActiveFilters: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onReset: () => void;
};

const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  value: country.code,
  label: country.label,
}));

export const CompaniesFilters = ({
  filters,
  statusOptions,
  hasActiveFilters,
  onChange,
  onReset,
}: CompaniesFiltersProps) => (
  <div className="flex flex-wrap items-center gap-2">
    <div className="relative min-w-52 flex-1">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted" />
      <Input
        name="query"
        value={filters.query}
        onChange={onChange}
        placeholder="Поиск по названию и описанию"
        className="pl-8.5"
      />
    </div>
    <Select
      name="countryCode"
      value={filters.countryCode}
      options={COUNTRY_OPTIONS}
      placeholder="Все страны"
      onChange={onChange}
      className="w-auto min-w-36"
    />
    <Select
      name="status"
      value={filters.status}
      options={statusOptions.map((status) => ({
        value: status,
        label: COMPANY_STATUS_LABELS[status],
      }))}
      placeholder="Все статусы"
      onChange={onChange}
      className="w-auto min-w-36"
    />
    {hasActiveFilters ? (
      <Button variant="ghost" size="sm" onClick={onReset}>
        Сбросить
      </Button>
    ) : null}
  </div>
);
