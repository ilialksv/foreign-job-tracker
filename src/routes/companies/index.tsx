import { createFileRoute } from "@tanstack/react-router";

import { CompaniesPage } from "@/entrypoints/companies/component";

export const Route = createFileRoute("/companies/")({
  component: CompaniesPage,
});
