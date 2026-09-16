import { PageHeader } from "@/shared/components/common/page-header";
import { SettingsData } from "@/widgets/settings/settings-data/components/settings-data";
import { SettingsProfile } from "@/widgets/settings/settings-profile/components/settings-profile";

export const SettingsPage = () => (
  <div className="flex flex-col gap-8">
    <PageHeader eyebrow="Конфигурация" title="Настройки" />
    <SettingsProfile />
    <SettingsData />
  </div>
);
