import { Link } from "@tanstack/react-router";

export type CompanyTabsProps = {
  companyId: string;
};

const ACTIVE_PROPS = {
  className: "border-accent text-ink",
};

export const CompanyTabs = ({ companyId }: CompanyTabsProps) => (
  <nav className="border-line flex gap-1 overflow-x-auto border-b">
    <Link
      to="/companies/$companyId"
      params={{ companyId }}
      activeOptions={{ exact: true }}
      activeProps={ACTIVE_PROPS}
      className="text-muted hover:text-ink border-b-2 border-transparent px-3 py-2 text-sm"
    >
      Обзор
    </Link>
    <Link
      to="/companies/$companyId/plan"
      params={{ companyId }}
      activeProps={ACTIVE_PROPS}
      className="text-muted hover:text-ink border-b-2 border-transparent px-3 py-2 text-sm"
    >
      Этапы
    </Link>
  </nav>
);
