# Source Architecture

Прагматичный Feature-Sliced Design. Полные правила — в `AGENTS.md` в корне.

## Куда класть файл

1. URL, параметры, guard → `src/routes`.
2. Композиция страницы из виджетов → `src/entrypoints/<page>/component.tsx`.
3. Доменный блок с поведением и данными → `src/widgets/<domain>/<slice>`.
4. Переиспользуемый презентационный доменный UI → `src/features/<domain>`.
5. Хук поверх репозитория → `src/actions/<domain>/hooks`.
6. Общий UI-примитив, хук, утилита → `src/shared`.
7. Инфраструктура и обёртки библиотек → `src/lib`.

## Структура виджета

```text
src/widgets/<domain>/<slice>/
  components/<slice>.tsx        главный компонент + скелетон
  components/<child>.tsx        значимые дочерние компоненты
  hooks/use-<slice>.ts          вся логика
  schemas/                      Zod-схемы форм и типы значений
  utils/                        чистые помощники и валидаторы
```

## Ключевые места

- `src/lib/storage` — весь LocalStorage: драйвер, репозитории, снапшот.
- `src/lib/pipeline` — определения шагов воронки и чистый движок.
- `src/actions/pipeline` — запись результатов шага и инвалидация кэша.
- `src/lib/tanstack-form` — слой форм: `useAppForm`, `withForm`, компоненты
  полей, валидаторы из Zod-схем.
- `src/lib/zod/schemas/common.ts` — переиспользуемые кирпичики валидации.
- `src/shared/types/entities.ts` — все доменные сущности.
