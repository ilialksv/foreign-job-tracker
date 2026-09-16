import { CompanyContacts } from "@/widgets/company/company-contacts/components/company-contacts";
import { CompanyNotes } from "@/widgets/company/company-notes/components/company-notes";
import { CompanySummary } from "@/widgets/company/company-summary/components/company-summary";
import { CompanyTimeline } from "@/widgets/company/company-timeline/components/company-timeline";
import { CompanyVacancies } from "@/widgets/company/company-vacancies/components/company-vacancies";

export type CompanyOverviewPageProps = {
  companyId: string;
};

export const CompanyOverviewPage = ({
  companyId,
}: CompanyOverviewPageProps) => (
  <div className="flex flex-col gap-4">
    <CompanySummary companyId={companyId} />
    <div className="grid gap-4 xl:grid-cols-2">
      <CompanyVacancies companyId={companyId} />
      <CompanyContacts companyId={companyId} />
      <CompanyNotes companyId={companyId} />
      <CompanyTimeline companyId={companyId} />
    </div>
  </div>
);
