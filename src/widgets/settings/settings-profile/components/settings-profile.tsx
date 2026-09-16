import { useGetSettings } from "@/actions/settings/hooks/use-get-settings";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { SettingsProfileForm } from "./settings-profile-form";

export const SettingsProfile = () => {
  const settingsQuery = useGetSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Профиль и ритм</CardTitle>
      </CardHeader>
      <CardContent>
        {settingsQuery.isLoading || !settingsQuery.data ? (
          <SettingsProfileSkeleton />
        ) : (
          <SettingsProfileForm settings={settingsQuery.data} />
        )}
      </CardContent>
    </Card>
  );
};

export const SettingsProfileSkeleton = () => (
  <div className="grid gap-3 sm:grid-cols-2">
    <Skeleton className="h-16 w-full" />
    <Skeleton className="h-16 w-full" />
    <Skeleton className="h-16 w-full" />
    <Skeleton className="h-16 w-full" />
  </div>
);
