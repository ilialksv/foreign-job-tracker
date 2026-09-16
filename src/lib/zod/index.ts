import * as z from "zod";

z.config({
  customError: (issue) => {
    switch (issue.code) {
      case "invalid_type":
        return { message: "Некорректный тип данных" };

      case "invalid_format":
        return { message: "Некорректный формат данных" };

      case "invalid_value":
        return { message: "Некорректное значение" };

      case "invalid_union":
        return {
          message: "Значение не подходит ни под один из допустимых вариантов",
        };

      case "too_big":
        if (issue.origin === "array") {
          return { message: `Выберите не более ${issue.maximum} элементов` };
        }

        if (issue.origin === "number") {
          return { message: `Значение должно быть не больше ${issue.maximum}` };
        }

        return {
          message: `Значение должно быть не длиннее ${issue.maximum} символов`,
        };

      case "too_small":
        if (issue.origin === "array") {
          return { message: `Выберите не менее ${issue.minimum} элементов` };
        }

        if (issue.origin === "number") {
          return { message: `Значение должно быть не меньше ${issue.minimum}` };
        }

        return {
          message: `Значение должно быть не короче ${issue.minimum} символов`,
        };

      default:
        return null;
    }
  },
});

export { z };
