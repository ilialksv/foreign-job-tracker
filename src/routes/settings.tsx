import { createFileRoute } from "@tanstack/react-router";

import { SettingsPage } from "@/entrypoints/settings/component";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});
