import { createFileRoute, Outlet } from "@tanstack/react-router";

const CompanyPlanLayoutRoute = () => <Outlet />;

export const Route = createFileRoute("/companies/$companyId/plan")({
  component: CompanyPlanLayoutRoute,
});
