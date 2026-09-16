import {
  addDays,
  addWeeks,
  differenceInCalendarDays,
  format,
  isValid,
  parseISO,
  startOfDay,
  startOfWeek,
} from "date-fns";

export const nowIso = () => new Date().toISOString();

export const todayIso = () => startOfDay(new Date()).toISOString();

export const shiftDaysIso = (params: { days: number; from?: string }) => {
  const base = params.from ? parseISO(params.from) : new Date();

  return startOfDay(addDays(base, params.days)).toISOString();
};

export const shiftWeeksIso = (params: { weeks: number; from?: string }) => {
  const base = params.from ? parseISO(params.from) : new Date();

  return startOfDay(addWeeks(base, params.weeks)).toISOString();
};

export const formatDate = (value: string | null) => {
  if (!value) {
    return "";
  }

  const parsed = parseISO(value);

  return isValid(parsed) ? format(parsed, "dd.MM.yyyy") : "";
};

export const formatDateTime = (value: string | null) => {
  if (!value) {
    return "";
  }

  const parsed = parseISO(value);

  return isValid(parsed) ? format(parsed, "dd.MM.yyyy HH:mm") : "";
};

export const getDaysFromToday = (value: string) => {
  const parsed = parseISO(value);

  if (!isValid(parsed)) {
    return 0;
  }

  return differenceInCalendarDays(startOfDay(parsed), startOfDay(new Date()));
};

export const isDue = (value: string | null) => {
  if (!value) {
    return false;
  }

  return getDaysFromToday(value) <= 0;
};

export const formatRelativeDay = (value: string | null) => {
  if (!value) {
    return "без даты";
  }

  const days = getDaysFromToday(value);

  if (days === 0) {
    return "сегодня";
  }

  if (days === 1) {
    return "завтра";
  }

  if (days < 0) {
    return `просрочено на ${Math.abs(days)} дн.`;
  }

  return `через ${days} дн.`;
};

export const toDateInputValue = (value: string | null) => {
  if (!value) {
    return "";
  }

  const parsed = parseISO(value);

  return isValid(parsed) ? format(parsed, "yyyy-MM-dd") : "";
};

export const fromDateInputValue = (value: string) => {
  if (value.length === 0) {
    return null;
  }

  const parsed = parseISO(value);

  return isValid(parsed) ? startOfDay(parsed).toISOString() : null;
};

/** Неделя считается с понедельника: так же, как человек считает свой план. */
export const isInCurrentWeek = (value: string | null) => {
  if (!value) {
    return false;
  }

  const parsed = parseISO(value);

  if (!isValid(parsed)) {
    return false;
  }

  return parsed >= startOfWeek(new Date(), { weekStartsOn: 1 });
};
