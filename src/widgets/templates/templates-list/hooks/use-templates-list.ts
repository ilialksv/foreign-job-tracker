import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useGetCompanies } from "@/actions/companies/hooks/use-get-companies";
import { useGetSettings } from "@/actions/settings/hooks/use-get-settings";
import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";
import { useRemoveTemplate } from "@/actions/templates/hooks/use-remove-template";
import type { Template } from "@/shared/types/entities";
import { copyText } from "@/shared/utils/copy-text";
import { fillTemplate } from "@/shared/utils/fill-template";

import { buildPreviewVariables } from "../utils/build-preview-variables";

type TemplatesFiltersState = {
  lang: string;
  audience: string;
  scenario: string;
  companyId: string;
};

const INITIAL_FILTERS: TemplatesFiltersState = {
  lang: "",
  audience: "",
  scenario: "",
  companyId: "",
};

export const useTemplatesList = () => {
  const [filters, setFilters] =
    useState<TemplatesFiltersState>(INITIAL_FILTERS);
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const templatesQuery = useGetTemplates();
  const companiesQuery = useGetCompanies();
  const settingsQuery = useGetSettings();
  const removeTemplate = useRemoveTemplate();

  const selectedCompany = useMemo(
    () =>
      (companiesQuery.data ?? []).find(
        (company) => company.id === filters.companyId,
      ) ?? null,
    [companiesQuery.data, filters.companyId],
  );

  const templates = useMemo(
    () =>
      (templatesQuery.data ?? [])
        .filter((template) =>
          filters.lang.length === 0 ? true : template.lang === filters.lang,
        )
        .filter((template) =>
          filters.audience.length === 0
            ? true
            : template.audience === filters.audience,
        )
        .filter((template) =>
          filters.scenario.length === 0
            ? true
            : template.scenario === filters.scenario,
        ),
    [filters, templatesQuery.data],
  );

  const getPreview = useCallback(
    (template: Template) =>
      fillTemplate({
        body: template.body,
        variables: buildPreviewVariables({
          company: selectedCompany,
          settings: settingsQuery.data,
        }),
      }),
    [selectedCompany, settingsQuery.data],
  );

  const handleFilterChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;

      setFilters((previous) => ({ ...previous, [name]: value }));
    },
    [],
  );

  const handleCopy = useCallback(async (copyParams: { text: string }) => {
    const copied = await copyText(copyParams.text);

    if (copied) {
      toast.success("Текст скопирован");
    }
  }, []);

  const handleEdit = useCallback(
    (editParams: { id: string }) => {
      const template = (templatesQuery.data ?? []).find(
        (item) => item.id === editParams.id,
      );

      setEditedTemplate(template ?? null);
      setIsFormOpen(true);
    },
    [templatesQuery.data],
  );

  const handleCreateClick = useCallback(() => {
    setEditedTemplate(null);
    setIsFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
    setEditedTemplate(null);
  }, []);

  const handleRemove = useCallback(
    (removeParams: { id: string }) => {
      removeTemplate.mutate({ id: removeParams.id });
    },
    [removeTemplate],
  );

  return {
    companies: companiesQuery.data ?? [],
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
    isLoading: templatesQuery.isLoading,
    templates,
  };
};
