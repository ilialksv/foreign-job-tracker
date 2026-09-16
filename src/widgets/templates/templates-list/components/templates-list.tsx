import { Plus } from "lucide-react";

import { TemplateCard } from "@/features/templates/template-card/components/template-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Select } from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  TEMPLATE_AUDIENCE_LABELS,
  TEMPLATE_LANG_LABELS,
  TEMPLATE_SCENARIO_LABELS,
} from "@/shared/constants/templates";
import { TemplateFormDialog } from "@/widgets/templates/template-form-dialog/components/template-form-dialog";

import { useTemplatesList } from "../hooks/use-templates-list";

const LANG_OPTIONS = Object.entries(TEMPLATE_LANG_LABELS).map(
  ([value, label]) => ({ value, label }),
);

const AUDIENCE_OPTIONS = Object.entries(TEMPLATE_AUDIENCE_LABELS).map(
  ([value, label]) => ({ value, label }),
);

const SCENARIO_OPTIONS = Object.entries(TEMPLATE_SCENARIO_LABELS).map(
  ([value, label]) => ({ value, label }),
);

export const TemplatesList = () => {
  const {
    companies,
    editedTemplate,
    filters,
    getPreview,
    handleCopy,
    handleCreateClick,
    handleEdit,
    handleFilterChange,
    handleFormClose,
    handleRemove,
    isFormOpen,
    isLoading,
    templates,
  } = useTemplatesList();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        <Select
          name="lang"
          value={filters.lang}
          options={LANG_OPTIONS}
          placeholder="Все языки"
          onChange={handleFilterChange}
        />
        <Select
          name="audience"
          value={filters.audience}
          options={AUDIENCE_OPTIONS}
          placeholder="Любая аудитория"
          onChange={handleFilterChange}
        />
        <Select
          name="scenario"
          value={filters.scenario}
          options={SCENARIO_OPTIONS}
          placeholder="Все сценарии"
          onChange={handleFilterChange}
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
        />
        <Button variant="primary" icon={<Plus />} onClick={handleCreateClick}>
          Новый шаблон
        </Button>
      </div>

      {isLoading ? (
        <TemplatesListSkeleton />
      ) : templates.length === 0 ? (
        <Plug title="Шаблонов нет" description="Добавь первый шаблон." />
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              preview={getPreview(template)}
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
      renderItem={(index) => <Skeleton key={index} className="h-40 w-full" />}
    />
  </div>
);
