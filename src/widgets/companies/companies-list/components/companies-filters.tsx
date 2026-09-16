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
  onChange,
  onReset,
}: CompaniesFiltersProps) => (
  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
    <Input
      name="query"
      value={filters.query}
      onChange={onChange}
      placeholder="Поиск по названию и описанию"
    />
    <Select
      name="countryCode"
      value={filters.countryCode}
      options={COUNTRY_OPTIONS}
      placeholder="Все страны"
      onChange={onChange}
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
    />
    <Button onClick={onReset}>Сбросить фильтры</Button>
  </div>
);
