import { createFileRoute } from "@tanstack/react-router";

import { CompanyRunPage } from "@/entrypoints/company-run/component";
import { z } from "@/lib/zod";

const runSearchSchema = z.object({
  taskId: z.string().optional(),
});

export type CompanyRunSearch = z.infer<typeof runSearchSchema>;

const validateSearch = (search: Record<string, unknown>): CompanyRunSearch => {
  const result = runSearchSchema.safeParse(search);

  return result.success ? result.data : {};
};

const CompanyRunRoute = () => {
  const { companyId } = Route.useParams();
  const { taskId } = Route.useSearch();

  return <CompanyRunPage companyId={companyId} taskId={taskId} />;
};

export const Route = createFileRoute("/companies/$companyId/run")({
  validateSearch,
  component: CompanyRunRoute,
});
