import { PageHeader } from "@/shared/components/common/page-header";
import { CompaniesList } from "@/widgets/companies/companies-list/components/companies-list";

export const CompaniesPage = () => (
  <div className="flex flex-col gap-5">
    <PageHeader
      title="Компании"
      description="Очередь, статусы и всё, что по ним известно."
    />
    <CompaniesList />
  </div>
);
