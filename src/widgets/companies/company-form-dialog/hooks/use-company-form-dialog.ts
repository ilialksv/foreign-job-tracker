import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useCreateCompany } from "@/actions/companies/hooks/use-create-company";
import { useUpdateCompany } from "@/actions/companies/hooks/use-update-company";
import type { Company, CompanyDepth } from "@/shared/types/entities";

export type CompanyFormValues = {
  name: string;
  countryCode: string;
  depth: CompanyDepth;
  queueTier: string;
  info: string;
  website: string;
  careersUrl: string;
};

const createInitialValues = (params: {
  company: Company | null;
  defaultCountryCode: string;
}): CompanyFormValues => ({
  name: params.company?.name ?? "",
  countryCode: params.company?.countryCode ?? params.defaultCountryCode,
  depth: params.company?.depth ?? "standard",
  queueTier: params.company?.queueTier ?? "",
  info: params.company?.info ?? "",
  website: params.company?.website ?? "",
  careersUrl: params.company?.careersUrl ?? "",
});

export const useCompanyFormDialog = (params: {
  company: Company | null;
  defaultCountryCode: string;
  onClose: () => void;
}) => {
  const [values, setValues] = useState<CompanyFormValues>(() =>
    createInitialValues({
      company: params.company,
      defaultCountryCode: params.defaultCountryCode,
    }),
  );

  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

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
    if (values.name.trim().length === 0) {
      toast.error("Название компании обязательно");

      return;
    }

    const payload = {
      name: values.name.trim(),
      countryCode: values.countryCode,
      depth: values.depth,
      queueTier: values.queueTier.trim() || null,
      info: values.info.trim(),
      website: values.website.trim() || null,
      careersUrl: values.careersUrl.trim() || null,
    };

    if (params.company) {
      updateCompany.mutate(
        { id: params.company.id, data: payload },
        {
          onSuccess: () => {
            toast.success("Компания обновлена");
            params.onClose();
          },
        },
      );

      return;
    }

    createCompany.mutate(
      {
        data: {
          ...payload,
          city: null,
          ats: null,
          engineeringSize: "unknown",
          hasRussianSpeakers: null,
          stack: [],
          tags: [],
          status: "queued",
          excludeReason: null,
          reviveAt: null,
          lastTouchAt: null,
          archivedAt: null,
        },
      },
      {
        onSuccess: () => {
          toast.success("Компания добавлена");
          params.onClose();
        },
      },
    );
  }, [createCompany, params, updateCompany, values]);

  return {
    handleFieldChange,
    handleSubmitClick,
    isPending: createCompany.isPending || updateCompany.isPending,
    values,
  };
};
