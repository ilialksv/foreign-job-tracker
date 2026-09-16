import { createFileRoute } from "@tanstack/react-router";

import { TemplatesPage } from "@/entrypoints/templates/component";

export const Route = createFileRoute("/templates")({
  component: TemplatesPage,
});
