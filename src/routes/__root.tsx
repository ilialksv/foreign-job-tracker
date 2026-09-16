import { createRootRoute } from "@tanstack/react-router";

import { RootLayout } from "@/entrypoints/root/component";

export const Route = createRootRoute({
  component: RootLayout,
});
