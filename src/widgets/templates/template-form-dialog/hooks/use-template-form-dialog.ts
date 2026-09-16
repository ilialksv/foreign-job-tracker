import { toast } from "sonner";

import { useCreateTemplate } from "@/actions/templates/hooks/use-create-template";
import { useUpdateTemplate } from "@/actions/templates/hooks/use-update-template";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import type { Template } from "@/shared/types/entities";

import { prepareTemplateFormValues } from "../utils/prepare-template-form-values";
import {
  templateFormMatchValidateFn,
  templateFormValidateFn,
} from "../utils/template-form-helpers";

export const useTemplateFormDialog = (params: {
  template: Template | null;
  onClose: () => void;
}) => {
  const createTemplate = useCreateTemplate();
  const updateTemplate = useUpdateTemplate();

  const editedTemplate = params.template;

  const form = useAppForm({
    defaultValues: prepareTemplateFormValues({ template: editedTemplate }),
    validators: {
      onChange: templateFormValidateFn,
      onSubmit: editedTemplate
        ? templateFormMatchValidateFn
        : templateFormValidateFn,
    },
    onSubmit: ({ value }) => {
      const payload = {
        title: value.title.trim(),
        audience: value.audience,
        scenario: value.scenario,
        bodies: { en: value.bodyEn, ru: value.bodyRu },
      };

      if (editedTemplate) {
        updateTemplate.mutate(
          { id: editedTemplate.id, data: payload },
          {
            onSuccess: () => {
              toast.success("Шаблон обновлён");
              params.onClose();
            },
            onError: () => {
              toast.error("Не получилось сохранить шаблон");
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
          onError: () => {
            toast.error("Не получилось сохранить шаблон");
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isEditMode: Boolean(editedTemplate),
    isPending: createTemplate.isPending || updateTemplate.isPending,
    onFormSubmit,
  };
};
