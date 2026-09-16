import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useCreateTemplate } from "@/actions/templates/hooks/use-create-template";
import { useUpdateTemplate } from "@/actions/templates/hooks/use-update-template";
import type {
  Template,
  TemplateAudience,
  TemplateLang,
  TemplateScenario,
} from "@/shared/types/entities";

export type TemplateFormValues = {
  title: string;
  lang: TemplateLang;
  audience: TemplateAudience;
  scenario: TemplateScenario;
  body: string;
};

const createInitialValues = (params: {
  template: Template | null;
}): TemplateFormValues => ({
  title: params.template?.title ?? "",
  lang: params.template?.lang ?? "en",
  audience: params.template?.audience ?? "any",
  scenario: params.template?.scenario ?? "custom",
  body: params.template?.body ?? "",
});

export const useTemplateFormDialog = (params: {
  template: Template | null;
  onClose: () => void;
}) => {
  const [values, setValues] = useState<TemplateFormValues>(() =>
    createInitialValues({ template: params.template }),
  );

  const createTemplate = useCreateTemplate();
  const updateTemplate = useUpdateTemplate();

  const handleFieldChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = event.target;

      setValues((previous) => ({ ...previous, [name]: value }));
    },
    [],
  );

  const handleSubmitClick = useCallback(() => {
    if (values.title.trim().length === 0 || values.body.trim().length === 0) {
      toast.error("Название и текст обязательны");

      return;
    }

    const payload = {
      title: values.title.trim(),
      lang: values.lang,
      audience: values.audience,
      scenario: values.scenario,
      body: values.body,
    };

    if (params.template) {
      updateTemplate.mutate(
        { id: params.template.id, data: payload },
        {
          onSuccess: () => {
            toast.success("Шаблон обновлён");
            params.onClose();
          },
        },
      );

      return;
    }

    createTemplate.mutate(
      { data: { ...payload, isBuiltIn: false } },
      {
        onSuccess: () => {
          toast.success("Шаблон добавлен");
          params.onClose();
        },
      },
    );
  }, [createTemplate, params, updateTemplate, values]);

  return {
    handleFieldChange,
    handleSubmitClick,
    isPending: createTemplate.isPending || updateTemplate.isPending,
    values,
  };
};
