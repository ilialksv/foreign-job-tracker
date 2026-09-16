import { z } from "..";

export const REQUIRED_MESSAGE = "Обязательное поле";
export const URL_MESSAGE = "Нужна ссылка вида https://example.com";

const HTTP_URL_PATTERN = /^https?:\/\/[^\s]+\.[^\s]+$/i;

export const isHttpUrl = (value: string) => HTTP_URL_PATTERN.test(value.trim());

/** Обязательный текст: пустая строка и пробелы не проходят. */
export const requiredTextSchema = (params?: {
  min?: number;
  max?: number;
  message?: string;
}) =>
  z
    .string()
    .trim()
    .min(params?.min ?? 1, params?.message ?? REQUIRED_MESSAGE)
    .max(params?.max ?? 2000);

/** Необязательный текст: пустая строка допустима. */
export const optionalTextSchema = (params?: { max?: number }) =>
  z
    .string()
    .trim()
    .max(params?.max ?? 4000);

/** Необязательная ссылка: пустая строка допустима, непустая проверяется. */
export const optionalUrlSchema = () =>
  optionalTextSchema({ max: 2000 }).refine(
    (value) => value.length === 0 || isHttpUrl(value),
    { message: URL_MESSAGE },
  );

/** Обязательная ссылка. */
export const requiredUrlSchema = () =>
  requiredTextSchema({ max: 2000 }).refine((value) => isHttpUrl(value), {
    message: URL_MESSAGE,
  });

/** Число, введённое в текстовое поле формы. */
export const numericTextSchema = (params: { min: number; max: number }) =>
  z
    .string()
    .trim()
    .min(1, REQUIRED_MESSAGE)
    .refine(
      (value) => {
        const parsed = Number(value);

        return (
          Number.isInteger(parsed) &&
          parsed >= params.min &&
          parsed <= params.max
        );
      },
      { message: `Целое число от ${params.min} до ${params.max}` },
    );

/** Обязательный выбор из списка: пустая строка означает «не выбрано». */
export const requiredEnumSchema = <TValue extends string>(params: {
  values: readonly TValue[];
  message?: string;
}) =>
  z.enum(params.values as [TValue, ...TValue[]], {
    error: params.message ?? "Выберите значение",
  });

/** Дата из input[type=date]: пустая строка допустима. */
export const optionalDateSchema = () =>
  z
    .string()
    .trim()
    .refine((value) => value.length === 0 || !Number.isNaN(Date.parse(value)), {
      message: "Некорректная дата",
    });
