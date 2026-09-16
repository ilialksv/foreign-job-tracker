export type CountryOption = {
  code: string;
  label: string;
};

export const COUNTRIES: CountryOption[] = [
  { code: "AE", label: "ОАЭ" },
  { code: "SA", label: "Саудовская Аравия" },
  { code: "QA", label: "Катар" },
  { code: "TR", label: "Турция" },
  { code: "RS", label: "Сербия" },
  { code: "GE", label: "Грузия" },
  { code: "CY", label: "Кипр" },
  { code: "DE", label: "Германия" },
  { code: "NL", label: "Нидерланды" },
  { code: "PL", label: "Польша" },
  { code: "PT", label: "Португалия" },
  { code: "VN", label: "Вьетнам" },
  { code: "XX", label: "Другая" },
];

export const getCountryLabel = (code: string) =>
  COUNTRIES.find((country) => country.code === code)?.label ?? code;
