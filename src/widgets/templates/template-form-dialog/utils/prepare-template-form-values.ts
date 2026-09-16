import type { Template } from "@/shared/types/entities";

import type { TemplateFormValues } from "../schemas/template-form-schema";

export const prepareTemplateFormValues = (params: {
  template: Template | null;
}): TemplateFormValues => ({
  title: params.template?.title ?? "",
  lang: params.template?.lang ?? "en",
  audience: params.template?.audience ?? "any",
  scenario: params.template?.scenario ?? "custom",
  body: params.template?.body ?? "",
});
