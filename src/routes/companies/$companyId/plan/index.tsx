import { createFileRoute } from "@tanstack/react-router";

import { CompanyPlanPage } from "@/entrypoints/company-plan/component";

const CompanyPlanRoute = () => {
  const { companyId } = Route.useParams();

  return <CompanyPlanPage companyId={companyId} />;
};

export const Route = createFileRoute("/companies/$companyId/plan/")({
  component: CompanyPlanRoute,
});
