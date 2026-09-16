import { createFileRoute } from "@tanstack/react-router";

import { CompanyOverviewPage } from "@/entrypoints/company-overview/component";

const CompanyOverviewRoute = () => {
  const { companyId } = Route.useParams();

  return <CompanyOverviewPage companyId={companyId} />;
};

export const Route = createFileRoute("/companies/$companyId/")({
  component: CompanyOverviewRoute,
});
