export type CsvRow = Record<string, string>;

const splitCsvLine = (params: { line: string }) => {
  const values: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < params.line.length; index += 1) {
    const char = params.line[index];

    if (char === '"') {
      const isEscapedQuote = insideQuotes && params.line[index + 1] === '"';

      if (isEscapedQuote) {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }

      continue;
    }

    if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";

      continue;
    }

    current += char;
  }

  values.push(current);

  return values.map((value) => value.trim());
};

const splitCsvRows = (params: { content: string }) => {
  const rows: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < params.content.length; index += 1) {
    const char = params.content[index];

    if (char === '"') {
      const isEscapedQuote = insideQuotes && params.content[index + 1] === '"';

      if (isEscapedQuote) {
        current += '""';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
        current += char;
      }

      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && params.content[index + 1] === "\n") {
        index += 1;
      }

      rows.push(current);
      current = "";

      continue;
    }

    current += char;
  }

  if (current.length > 0) {
    rows.push(current);
  }

  return rows.filter((row) => row.trim().length > 0);
};

export const parseCsv = (params: { content: string }): CsvRow[] => {
  const rows = splitCsvRows({ content: params.content });

  if (rows.length < 2) {
    return [];
  }

  const headers = splitCsvLine({ line: rows[0] });

  return rows.slice(1).map((row) => {
    const values = splitCsvLine({ line: row });

    return headers.reduce<CsvRow>((acc, header, index) => {
      acc[header] = values[index] ?? "";

      return acc;
    }, {});
  });
};
