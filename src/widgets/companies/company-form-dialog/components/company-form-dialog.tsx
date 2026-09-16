import { useCallback } from "react";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Field } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  COMPANY_DEPTH_LABELS,
  COMPANY_DEPTH_ORDER,
} from "@/shared/constants/company";
import { COUNTRIES } from "@/shared/constants/countries";
import type { Company } from "@/shared/types/entities";

import { useCompanyFormDialog } from "../hooks/use-company-form-dialog";

export type CompanyFormDialogProps = {
  company: Company | null;
  defaultCountryCode: string;
  onClose: () => void;
};

const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  value: country.code,
  label: country.label,
}));

const DEPTH_OPTIONS = COMPANY_DEPTH_ORDER.map((depth) => ({
  value: depth,
  label: COMPANY_DEPTH_LABELS[depth],
}));

export const CompanyFormDialog = ({
  company,
  defaultCountryCode,
  onClose,
}: CompanyFormDialogProps) => {
  const { handleFieldChange, handleSubmitClick, isPending, values } =
    useCompanyFormDialog({ company, defaultCountryCode, onClose });

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
        title={company ? "Изменить компанию" : "Новая компания"}
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
              name="name"
              value={values.name}
              onChange={handleFieldChange}
              placeholder="Property Finder"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Страна">
              <Select
                name="countryCode"
                value={values.countryCode}
                options={COUNTRY_OPTIONS}
                onChange={handleFieldChange}
              />
            </Field>
            <Field label="Глубина проработки">
              <Select
                name="depth"
                value={values.depth}
                options={DEPTH_OPTIONS}
                onChange={handleFieldChange}
              />
            </Field>
          </div>
          <Field label="Очередь" hint="Например: 1 · Живые вакансии">
            <Input
              name="queueTier"
              value={values.queueTier}
              onChange={handleFieldChange}
            />
          </Field>
          <Field label="Информация">
            <Textarea
              name="info"
              value={values.info}
              onChange={handleFieldChange}
              placeholder="Что известно про компанию и почему она в списке"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Сайт">
              <Input
                name="website"
                value={values.website}
                onChange={handleFieldChange}
                placeholder="https://"
              />
            </Field>
            <Field label="Careers">
              <Input
                name="careersUrl"
                value={values.careersUrl}
                onChange={handleFieldChange}
                placeholder="https://"
              />
            </Field>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
