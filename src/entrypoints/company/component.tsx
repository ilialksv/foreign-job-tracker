import { Outlet } from "@tanstack/react-router";

import { CompanyTabs } from "@/widgets/company/company-tabs/components/company-tabs";

export type CompanyLayoutProps = {
  companyId: string;
};

export const CompanyLayout = ({ companyId }: CompanyLayoutProps) => (
  <div className="flex flex-col gap-5">
    <CompanyTabs companyId={companyId} />
    <Outlet />
  </div>
);
