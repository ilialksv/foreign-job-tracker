import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export const useCompanyStep = (params: { companyId: string }) => {
  const navigate = useNavigate();

  const handleSelectTask = useCallback(
    (selectParams: { id: string }) => {
      navigate({
        to: "/companies/$companyId/plan/$taskId",
        params: { companyId: params.companyId, taskId: selectParams.id },
      });
    },
    [navigate, params.companyId],
  );

  const handleAfterComplete = useCallback(
    (completeParams: { nextTaskId: string | null }) => {
      if (completeParams.nextTaskId) {
        navigate({
          to: "/companies/$companyId/plan/$taskId",
          params: {
            companyId: params.companyId,
            taskId: completeParams.nextTaskId,
          },
        });

        return;
      }

      navigate({
        to: "/companies/$companyId/plan",
        params: { companyId: params.companyId },
      });
    },
    [navigate, params.companyId],
  );

  return { handleAfterComplete, handleSelectTask };
};
