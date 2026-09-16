import { PageHeader } from "@/shared/components/common/page-header";
import { SettingsData } from "@/widgets/settings/settings-data/components/settings-data";
import { SettingsProfile } from "@/widgets/settings/settings-profile/components/settings-profile";

export const SettingsPage = () => (
  <div className="flex flex-col gap-5">
    <PageHeader
      title="Настройки"
      description="Профиль, ритм работы и перенос данных между браузерами."
    />
    <SettingsProfile />
    <SettingsData />
  </div>
);
