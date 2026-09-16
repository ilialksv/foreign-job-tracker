import { PageHeader } from "@/shared/components/common/page-header";
import { CompaniesList } from "@/widgets/companies/companies-list/components/companies-list";

export const CompaniesPage = () => (
  <div className="flex flex-col gap-6">
    <PageHeader
      eyebrow="Очередь"
      title="Компании"
      description="Кого ведём, на каком статусе и когда касались в последний раз."
    />
    <CompaniesList />
  </div>
);
