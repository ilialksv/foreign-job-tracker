import type { Company, Settings } from "@/shared/types/entities";
import type { TemplateVariables } from "@/shared/utils/fill-template";

export const buildPreviewVariables = (params: {
  company: Company | null;
  settings: Settings | undefined;
}): TemplateVariables => ({
  company: params.company?.name ?? null,
  contactName: null,
  vacancyTitle: null,
  vacancyUrl: null,
  productDetail: null,
  myName: params.settings?.profile.fullName ?? null,
  portfolioUrl: params.settings?.profile.portfolioUrl ?? null,
});
