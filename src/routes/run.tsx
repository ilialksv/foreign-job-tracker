import { createFileRoute } from "@tanstack/react-router";

import { RunPage } from "@/entrypoints/run/component";

export const Route = createFileRoute("/run")({
  component: RunPage,
});
