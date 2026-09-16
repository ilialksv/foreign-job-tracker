import { Download } from "lucide-react";

import { useGetSettings } from "@/actions/settings/hooks/use-get-settings";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Field } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { COUNTRIES } from "@/shared/constants/countries";

import { useSettingsData } from "../hooks/use-settings-data";

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
    <Card>
      <CardHeader>
        <CardTitle>Данные</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">Экспорт</span>
          <p className="text-sm text-muted">
            Один JSON со всеми компаниями, контактами, вакансиями, задачами,
            ответами на шагах, заметками и шаблонами.
          </p>
          <div>
            <Button
              icon={<Download />}
              disabled={isPending}
              onClick={handleExportClick}
            >
              Скачать JSON
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-4">
          <span className="text-sm font-medium text-ink">Импорт JSON</span>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Стратегия">
              <Select
                value={strategy}
                options={STRATEGY_OPTIONS}
                onChange={handleStrategyChange}
              />
            </Field>
            <Field label="Файл">
              <Input
                type="file"
                accept="application/json"
                className="h-10 py-2"
                onChange={handleJsonFileChange}
              />
            </Field>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-4">
          <span className="text-sm font-medium text-ink">
            Импорт компаний из CSV
          </span>
          <p className="text-sm text-muted">
            Колонки: Компания, Очередь, Уровень, Информация, Статус, Дата
            контакта, Следующий контакт, Нанимающий(е), Инженер(ы).
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Страна для импортируемых">
              <Select
                value={countryCode}
                options={COUNTRY_OPTIONS}
                onChange={handleCountryChange}
              />
            </Field>
            <Field label="Файл">
              <Input
                type="file"
                accept=".csv,text/csv"
                className="h-10 py-2"
                onChange={handleCsvFileChange}
              />
            </Field>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-4">
          <span className="text-sm font-medium text-ink">Очистка</span>
          <p className="text-sm text-muted">
            Удаляет компании, контакты, вакансии, задачи, заметки и историю.
            Шаблоны и настройки остаются.
          </p>
          <div>
            <Button
              variant="danger"
              disabled={isPending}
              onClick={handleClearClick}
            >
              Очистить данные
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
