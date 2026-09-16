import type { Template } from "@/shared/types/entities";

import type { TemplateFormValues } from "../schemas/template-form-schema";

export const prepareTemplateFormValues = (params: {
  template: Template | null;
}): TemplateFormValues => ({
  title: params.template?.title ?? "",
  audience: params.template?.audience ?? "any",
  scenario: params.template?.scenario ?? "custom",
  bodyEn: params.template?.bodies.en ?? "",
  bodyRu: params.template?.bodies.ru ?? "",
});
