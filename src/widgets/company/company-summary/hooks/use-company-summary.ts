import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { useGetCompany } from "@/actions/companies/hooks/use-get-company";
import { useRemoveCompany } from "@/actions/companies/hooks/use-remove-company";
import { useUpdateCompany } from "@/actions/companies/hooks/use-update-company";
import { useStartPipeline } from "@/actions/pipeline/hooks/use-start-pipeline";
import { useGetTasks } from "@/actions/tasks/hooks/use-get-tasks";
import { isTaskOpen } from "@/lib/pipeline";
import {
  COMPANY_DEPTH_LABELS,
  COMPANY_STATUS_ORDER,
  ENGINEERING_SIZE_LABELS,
} from "@/shared/constants/company";
import { getCountryLabel } from "@/shared/constants/countries";

export const useCompanySummary = (params: { companyId: string }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const navigate = useNavigate();
  const companyQuery = useGetCompany({ id: params.companyId });
  const tasksQuery = useGetTasks();
  const updateCompany = useUpdateCompany();
  const removeCompany = useRemoveCompany();
  const startPipeline = useStartPipeline();

  const companyTasks = useMemo(
    () =>
      (tasksQuery.data ?? []).filter(
        (task) => task.companyId === params.companyId,
      ),
    [params.companyId, tasksQuery.data],
  );

  const hasPipeline = companyTasks.some((task) => task.kind === "stage");
  const openTasksCount = companyTasks.filter((task) =>
    isTaskOpen({ task }),
  ).length;

  const company = companyQuery.data ?? null;

  const metaItems = useMemo(() => {
    if (!company) {
      return [];
    }

    const items = [
      getCountryLabel(company.countryCode),
      COMPANY_DEPTH_LABELS[company.depth],
      ENGINEERING_SIZE_LABELS[company.engineeringSize],
    ];

    if (company.queueTier) {
      items.push(company.queueTier);
    }

    if (company.hasRussianSpeakers) {
      items.push("есть русскоязычные");
    }

    return items;
  }, [company]);

  const handleStatusChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const status = COMPANY_STATUS_ORDER.find(
        (item) => item === event.target.value,
      );

      if (!status) {
        return;
      }

      updateCompany.mutate(
        { id: params.companyId, data: { status } },
        {
          onSuccess: () => {
            toast.success("Статус обновлён");
          },
        },
      );
    },
    [params.companyId, updateCompany],
  );

  const handleStartPipelineClick = useCallback(() => {
    startPipeline.mutate(
      { companyId: params.companyId },
      {
        onSuccess: () => {
          toast.success("Воронка запущена");
          navigate({
            to: "/companies/$companyId/plan",
            params: { companyId: params.companyId },
          });
        },
      },
    );
  }, [navigate, params.companyId, startPipeline]);

  const handleRemoveClick = useCallback(() => {
    removeCompany.mutate(
      { id: params.companyId },
      {
        onSuccess: () => {
          toast.success("Компания удалена");
          navigate({ to: "/companies" });
        },
      },
    );
  }, [navigate, params.companyId, removeCompany]);

  const handleEditClick = useCallback(() => {
    setIsEditOpen(true);
  }, []);

  const handleEditClose = useCallback(() => {
    setIsEditOpen(false);
  }, []);

  return {
    company,
    metaItems,
    handleEditClick,
    handleEditClose,
    handleRemoveClick,
    handleStartPipelineClick,
    handleStatusChange,
    hasPipeline,
    isEditOpen,
    isLoading: companyQuery.isLoading,
    openTasksCount,
  };
};
