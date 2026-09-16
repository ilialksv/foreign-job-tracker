export type TemplateVariables = Record<string, string | null | undefined>;

export const fillTemplate = (params: {
  body: string;
  variables: TemplateVariables;
}) =>
  params.body.replace(/{{\s*(\w+)\s*}}/g, (match, key: string) => {
    const value = params.variables[key];

    return value ? value : match;
  });
