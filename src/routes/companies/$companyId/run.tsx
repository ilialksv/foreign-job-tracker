import { createFileRoute } from "@tanstack/react-router";

import { CompanyRunPage } from "@/entrypoints/company-run/component";

const CompanyRunRoute = () => {
  const { companyId } = Route.useParams();

  return <CompanyRunPage companyId={companyId} />;
};

export const Route = createFileRoute("/companies/$companyId/run")({
  component: CompanyRunRoute,
});
