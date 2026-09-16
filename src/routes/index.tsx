import { createFileRoute } from "@tanstack/react-router";

import { TodayPage } from "@/entrypoints/today/component";

export const Route = createFileRoute("/")({
  component: TodayPage,
});
