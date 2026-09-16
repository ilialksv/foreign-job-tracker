import { Outlet } from "@tanstack/react-router";

import { AppNavigation } from "@/widgets/navigation/app-navigation/components/app-navigation";

export const RootLayout = () => (
  <div className="min-h-dvh bg-paper md:grid md:grid-cols-[216px_minmax(0,1fr)]">
    <AppNavigation />
    <main className="mx-auto w-full max-w-[1080px] px-4 pt-6 pb-24 md:px-8 md:py-9">
      <Outlet />
    </main>
  </div>
);
