import { useCallback } from "react";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import type { Template } from "@/shared/types/entities";

import { useTemplateFormDialog } from "../hooks/use-template-form-dialog";
import { TemplateFormFields } from "./template-form-fields";

export type TemplateFormDialogProps = {
  template: Template | null;
  onClose: () => void;
};

const TEMPLATE_FORM_ID = "template-form";

export const TemplateFormDialog = ({
  template,
  onClose,
}: TemplateFormDialogProps) => {
  const { form, isEditMode, isPending, onFormSubmit } = useTemplateFormDialog({
    template,
    onClose,
  });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent
        title={isEditMode ? "Изменить шаблон" : "Новый шаблон"}
        description="Плейсхолдеры: {{company}}, {{contactName}}, {{vacancyTitle}}, {{vacancyUrl}}, {{productDetail}}, {{myName}}, {{portfolioUrl}}"
        footer={
          <>
            <Button onClick={onClose}>Отмена</Button>
            <form.AppForm>
              <form.SubmitButton form={TEMPLATE_FORM_ID} disabled={isPending}>
                Сохранить
              </form.SubmitButton>
            </form.AppForm>
          </>
        }
      >
        <form id={TEMPLATE_FORM_ID} onSubmit={onFormSubmit} noValidate>
          <TemplateFormFields form={form} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
