import { CompanyContacts } from "@/widgets/company/company-contacts/components/company-contacts";
import { CompanyNotes } from "@/widgets/company/company-notes/components/company-notes";
import { CompanyTimeline } from "@/widgets/company/company-timeline/components/company-timeline";
import { CompanyVacancies } from "@/widgets/company/company-vacancies/components/company-vacancies";

export type CompanyOverviewPageProps = {
  companyId: string;
};

export const CompanyOverviewPage = ({
  companyId,
}: CompanyOverviewPageProps) => (
  <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
    <div className="flex flex-col gap-4">
      <CompanyVacancies companyId={companyId} />
      <CompanyContacts companyId={companyId} />
    </div>
    <div className="flex flex-col gap-4">
      <CompanyNotes companyId={companyId} />
      <CompanyTimeline companyId={companyId} />
    </div>
  </div>
);
