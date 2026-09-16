import "./styles/globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

import { createQueryClient } from "@/lib/tanstack-query/create-query-client";
import { createRouter } from "@/lib/tanstack-router/create-router";

const mount = () => {
  const queryClient = createQueryClient();
  const router = createRouter();
  const rootElement = document.getElementById("root");

  if (rootElement && !rootElement.innerHTML) {
    ReactDOM.createRoot(rootElement).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </QueryClientProvider>
      </StrictMode>,
    );
  }
};

mount();
