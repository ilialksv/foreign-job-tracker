import { Link, Outlet } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { CompanyHeader } from "@/widgets/company/company-header/components/company-header";
import { CompanyTabs } from "@/widgets/company/company-tabs/components/company-tabs";

export type CompanyLayoutProps = {
  companyId: string;
};

export const CompanyLayout = ({ companyId }: CompanyLayoutProps) => (
  <div className="flex flex-col gap-6">
    <Link
      to="/companies"
      className="inline-flex w-fit items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-muted uppercase hover:text-ink"
    >
      <ArrowLeft className="size-3.5" />
      Компании
    </Link>

    <CompanyHeader companyId={companyId} />

    <div className="flex flex-col gap-3">
      <CompanyTabs companyId={companyId} />
      <Outlet />
    </div>
  </div>
);
