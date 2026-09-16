import { PageHeader } from "@/shared/components/common/page-header";
import { TemplatesList } from "@/widgets/templates/templates-list/components/templates-list";

export const TemplatesPage = () => (
  <div className="flex flex-col gap-6">
    <PageHeader
      title="Шаблоны"
      description="Записки, follow-up и письма на двух языках. Плейсхолдеры подставляются сами."
    />
    <TemplatesList />
  </div>
);
