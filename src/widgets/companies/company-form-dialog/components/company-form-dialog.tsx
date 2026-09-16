import { useCallback } from "react";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import type { Company } from "@/shared/types/entities";

import { useCompanyFormDialog } from "../hooks/use-company-form-dialog";
import { CompanyFormFields } from "./company-form-fields";

export type CompanyFormDialogProps = {
  company: Company | null;
  defaultCountryCode: string;
  onClose: () => void;
};

const COMPANY_FORM_ID = "company-form";

export const CompanyFormDialog = ({
  company,
  defaultCountryCode,
  onClose,
}: CompanyFormDialogProps) => {
  const { form, isEditMode, isPending, onFormSubmit } = useCompanyFormDialog({
    company,
    defaultCountryCode,
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
        title={isEditMode ? "Изменить компанию" : "Новая компания"}
        footer={
          <>
            <Button onClick={onClose}>Отмена</Button>
            <form.AppForm>
              <form.SubmitButton form={COMPANY_FORM_ID} disabled={isPending}>
                Сохранить
              </form.SubmitButton>
            </form.AppForm>
          </>
        }
      >
        <form id={COMPANY_FORM_ID} onSubmit={onFormSubmit} noValidate>
          <CompanyFormFields form={form} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
