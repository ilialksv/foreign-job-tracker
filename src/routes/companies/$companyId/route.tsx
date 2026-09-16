import { createFileRoute } from "@tanstack/react-router";

import { CompanyLayout } from "@/entrypoints/company/component";

const CompanyLayoutRoute = () => {
  const { companyId } = Route.useParams();

  return <CompanyLayout companyId={companyId} />;
};

export const Route = createFileRoute("/companies/$companyId")({
  component: CompanyLayoutRoute,
});
