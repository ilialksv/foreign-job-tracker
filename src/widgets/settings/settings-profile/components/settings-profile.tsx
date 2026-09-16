import { useGetSettings } from "@/actions/settings/hooks/use-get-settings";
import { ItemsList } from "@/shared/components/common/items-list";
import { Section } from "@/shared/components/layouts/section";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { SettingsProfileForm } from "./settings-profile-form";

export const SettingsProfile = () => {
  const settingsQuery = useGetSettings();

  return (
    <Section
      title="Профиль"
      description="Эти значения подставляются в шаблоны и задают недельную норму."
    >
      {settingsQuery.isLoading || !settingsQuery.data ? (
        <SettingsProfileSkeleton />
      ) : (
        <SettingsProfileForm settings={settingsQuery.data} />
      )}
    </Section>
  );
};

export const SettingsProfileSkeleton = () => (
  <div className="grid gap-3 sm:grid-cols-2">
    <ItemsList
      count={4}
      renderItem={(index) => <Skeleton key={index} className="h-16 w-full" />}
    />
  </div>
);
