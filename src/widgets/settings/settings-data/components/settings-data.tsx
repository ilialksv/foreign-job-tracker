import { Download } from "lucide-react";

import { useGetSettings } from "@/actions/settings/hooks/use-get-settings";
import { Section } from "@/shared/components/layouts/section";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { COUNTRIES } from "@/shared/constants/countries";

import { useSettingsData } from "../hooks/use-settings-data";
import { SettingsDataRow } from "./settings-data-row";

const STRATEGY_OPTIONS = [
  { value: "merge", label: "Объединить с текущими" },
  { value: "replace", label: "Заменить всё целиком" },
];

const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  value: country.code,
  label: country.label,
}));

export const SettingsData = () => {
  const settingsQuery = useGetSettings();
  const {
    countryCode,
    handleClearClick,
    handleCountryChange,
    handleCsvFileChange,
    handleExportClick,
    handleJsonFileChange,
    handleStrategyChange,
    isPending,
    strategy,
  } = useSettingsData({
    defaultCountryCode: settingsQuery.data?.defaultCountryCode ?? "AE",
  });

  return (
    <Section
      title="Данные"
      description="Перенос между браузерами идёт через файл: бэкенда нет."
      contentClassName="px-0 pb-0"
      divided
    >
      <SettingsDataRow
        title="Экспорт"
        description="Один JSON: компании, контакты, вакансии, задачи с ответами, заметки, история и шаблоны."
        control={
          <Button
            icon={<Download />}
            disabled={isPending}
            onClick={handleExportClick}
          >
            Скачать JSON
          </Button>
        }
      />
      <SettingsDataRow
        title="Импорт JSON"
        description="«Объединить» доливает данные по id, «заменить» стирает текущие и кладёт файл целиком."
        control={
          <>
            <Select
              value={strategy}
              options={STRATEGY_OPTIONS}
              onChange={handleStrategyChange}
              aria-label="Стратегия импорта"
            />
            <Input
              type="file"
              accept="application/json"
              className="h-auto py-1.5"
              onChange={handleJsonFileChange}
              aria-label="Файл JSON"
            />
          </>
        }
      />
      <SettingsDataRow
        title="Импорт компаний из CSV"
        description="Колонки: Компания, Очередь, Уровень, Информация, Статус, Дата контакта, Следующий контакт, Нанимающий(е), Инженер(ы). Дубли по названию пропускаются."
        control={
          <>
            <Select
              value={countryCode}
              options={COUNTRY_OPTIONS}
              onChange={handleCountryChange}
              aria-label="Страна для импортируемых"
            />
            <Input
              type="file"
              accept=".csv,text/csv"
              className="h-auto py-1.5"
              onChange={handleCsvFileChange}
              aria-label="Файл CSV"
            />
          </>
        }
      />
      <SettingsDataRow
        title="Очистка"
        description="Удаляет компании, контакты, вакансии, задачи, заметки и историю. Шаблоны и настройки остаются."
        control={
          <Button
            variant="danger"
            disabled={isPending}
            onClick={handleClearClick}
          >
            Очистить данные
          </Button>
        }
      />
    </Section>
  );
};
