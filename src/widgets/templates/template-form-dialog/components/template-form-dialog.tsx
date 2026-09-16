import { useCallback } from "react";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Field } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  TEMPLATE_AUDIENCE_LABELS,
  TEMPLATE_LANG_LABELS,
  TEMPLATE_SCENARIO_LABELS,
} from "@/shared/constants/templates";
import type { Template } from "@/shared/types/entities";

import { useTemplateFormDialog } from "../hooks/use-template-form-dialog";

export type TemplateFormDialogProps = {
  template: Template | null;
  onClose: () => void;
};

const LANG_OPTIONS = Object.entries(TEMPLATE_LANG_LABELS).map(
  ([value, label]) => ({ value, label }),
);

const AUDIENCE_OPTIONS = Object.entries(TEMPLATE_AUDIENCE_LABELS).map(
  ([value, label]) => ({ value, label }),
);

const SCENARIO_OPTIONS = Object.entries(TEMPLATE_SCENARIO_LABELS).map(
  ([value, label]) => ({ value, label }),
);

export const TemplateFormDialog = ({
  template,
  onClose,
}: TemplateFormDialogProps) => {
  const { handleFieldChange, handleSubmitClick, isPending, values } =
    useTemplateFormDialog({ template, onClose });

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
        title={template ? "Изменить шаблон" : "Новый шаблон"}
        description="Плейсхолдеры: {{company}}, {{contactName}}, {{vacancyTitle}}, {{vacancyUrl}}, {{productDetail}}, {{myName}}, {{portfolioUrl}}"
        footer={
          <>
            <Button onClick={onClose}>Отмена</Button>
            <Button
              variant="primary"
              disabled={isPending}
              onClick={handleSubmitClick}
            >
              Сохранить
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <Field label="Название">
            <Input
              name="title"
              value={values.title}
              onChange={handleFieldChange}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Язык">
              <Select
                name="lang"
                value={values.lang}
                options={LANG_OPTIONS}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Кому">
              <Select
                name="audience"
                value={values.audience}
                options={AUDIENCE_OPTIONS}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Сценарий">
              <Select
                name="scenario"
                value={values.scenario}
                options={SCENARIO_OPTIONS}
                onChange={handleFieldChange}
              />
            </Field>
          </div>
          <Field label="Текст">
            <Textarea
              name="body"
              rows={10}
              value={values.body}
              onChange={handleFieldChange}
            />
          </Field>
        </div>
      </DialogContent>
    </Dialog>
  );
};
