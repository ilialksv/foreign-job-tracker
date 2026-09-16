import { toast } from "sonner";

import { useCreateCompany } from "@/actions/companies/hooks/use-create-company";
import { useUpdateCompany } from "@/actions/companies/hooks/use-update-company";
import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";
import type { Company } from "@/shared/types/entities";

import {
  companyFormMatchValidateFn,
  companyFormValidateFn,
} from "../utils/company-form-helpers";
import { prepareCompanyFormValues } from "../utils/prepare-company-form-values";
import {
  prepareCompanyCreateData,
  prepareCompanyUpdateData,
} from "../utils/prepare-company-submit-data";

export const useCompanyFormDialog = (params: {
  company: Company | null;
  defaultCountryCode: string;
  onClose: () => void;
}) => {
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const editedCompany = params.company;

  const form = useAppForm({
    defaultValues: prepareCompanyFormValues({
      company: editedCompany,
      defaultCountryCode: params.defaultCountryCode,
    }),
    validators: {
      onChange: companyFormValidateFn,
      onSubmit: editedCompany
        ? companyFormMatchValidateFn
        : companyFormValidateFn,
    },
    onSubmit: ({ value }) => {
      if (editedCompany) {
        updateCompany.mutate(
          {
            id: editedCompany.id,
            data: prepareCompanyUpdateData({ values: value }),
          },
          {
            onSuccess: () => {
              toast.success("Компания обновлена");
              params.onClose();
            },
            onError: () => {
              toast.error("Не получилось сохранить компанию");
            },
          },
        );

        return;
      }

      createCompany.mutate(
        { data: prepareCompanyCreateData({ values: value }) },
        {
          onSuccess: () => {
            toast.success("Компания добавлена");
            params.onClose();
          },
          onError: () => {
            toast.error("Не получилось сохранить компанию");
          },
        },
      );
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });

  return {
    form,
    isEditMode: Boolean(editedCompany),
    isPending: createCompany.isPending || updateCompany.isPending,
    onFormSubmit,
  };
};
