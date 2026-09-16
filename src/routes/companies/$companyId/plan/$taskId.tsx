import { createFileRoute } from "@tanstack/react-router";

import { CompanyStepPage } from "@/entrypoints/company-step/component";

const CompanyStepRoute = () => {
  const { companyId, taskId } = Route.useParams();

  return <CompanyStepPage companyId={companyId} taskId={taskId} />;
};

export const Route = createFileRoute("/companies/$companyId/plan/$taskId")({
  component: CompanyStepRoute,
});
