import { Outlet } from "@tanstack/react-router";

import { AppNavigation } from "@/widgets/navigation/app-navigation/components/app-navigation";

export const RootLayout = () => (
  <div className="min-h-dvh bg-ground">
    <AppNavigation />
    <main className="mx-auto w-full max-w-6xl px-4 pt-5 pb-24 md:pb-10">
      <Outlet />
    </main>
  </div>
);
