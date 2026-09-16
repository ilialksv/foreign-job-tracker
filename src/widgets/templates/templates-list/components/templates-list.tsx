import { Plus } from "lucide-react";

import { TemplateCard } from "@/features/templates/template-card/components/template-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Select } from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  TEMPLATE_AUDIENCE_LABELS,
  TEMPLATE_AUDIENCE_ORDER,
  TEMPLATE_SCENARIO_LABELS,
  TEMPLATE_SCENARIO_ORDER,
} from "@/shared/constants/templates";
import { TemplateFormDialog } from "@/widgets/templates/template-form-dialog/components/template-form-dialog";

import { useTemplatesList } from "../hooks/use-templates-list";

const AUDIENCE_OPTIONS = TEMPLATE_AUDIENCE_ORDER.map((audience) => ({
  value: audience,
  label: TEMPLATE_AUDIENCE_LABELS[audience],
}));

const SCENARIO_OPTIONS = TEMPLATE_SCENARIO_ORDER.map((scenario) => ({
  value: scenario,
  label: TEMPLATE_SCENARIO_LABELS[scenario],
}));

export const TemplatesList = () => {
  const {
    companies,
    editedTemplate,
    filters,
    getLang,
    getPreview,
    handleCopy,
    handleCreateClick,
    handleEdit,
    handleFilterChange,
    handleFormClose,
    handleLangChange,
    handleRemove,
    isFormOpen,
    isLoading,
    templates,
  } = useTemplatesList();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <Select
          name="audience"
          value={filters.audience}
          options={AUDIENCE_OPTIONS}
          placeholder="Любая аудитория"
          onChange={handleFilterChange}
          className="w-auto min-w-40"
        />
        <Select
          name="scenario"
          value={filters.scenario}
          options={SCENARIO_OPTIONS}
          placeholder="Все сценарии"
          onChange={handleFilterChange}
          className="w-auto min-w-44"
        />
        <Select
          name="companyId"
          value={filters.companyId}
          options={companies.map((company) => ({
            value: company.id,
            label: company.name,
          }))}
          placeholder="Подставить компанию"
          onChange={handleFilterChange}
          className="w-auto min-w-44"
        />
        <Button
          variant="primary"
          icon={<Plus />}
          className="ml-auto"
          onClick={handleCreateClick}
        >
          Шаблон
        </Button>
      </div>

      {isLoading ? (
        <TemplatesListSkeleton />
      ) : templates.length === 0 ? (
        <Plug
          title="Шаблонов нет"
          description="Смягчи фильтры или добавь свой шаблон."
        />
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              lang={getLang(template)}
              preview={getPreview(template)}
              onLangChange={handleLangChange}
              onCopy={handleCopy}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}

      {isFormOpen ? (
        <TemplateFormDialog
          template={editedTemplate}
          onClose={handleFormClose}
        />
      ) : null}
    </div>
  );
};

export const TemplatesListSkeleton = () => (
  <div className="grid gap-3 lg:grid-cols-2">
    <ItemsList
      count={4}
      renderItem={(index) => <Skeleton key={index} className="h-44 w-full" />}
    />
  </div>
);
