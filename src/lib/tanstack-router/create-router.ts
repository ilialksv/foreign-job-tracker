import { createRouter as createTanstackRouter } from "@tanstack/react-router";

import { routeTree } from "@/codegen/router/route-tree.gen";

export const createRouter = () =>
  createTanstackRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
