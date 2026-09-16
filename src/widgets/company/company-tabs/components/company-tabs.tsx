import { Link } from "@tanstack/react-router";

export type CompanyTabsProps = {
  companyId: string;
};

/**
 * Сегментированный переключатель: выбранная вкладка отличается сразу
 * поверхностью, рамкой и цветом текста — по правилам NN/g одного признака мало.
 */
const ACTIVE_PROPS = {
  className: "bg-raised text-ink",
};

const TAB_CLASS =
  "inline-flex h-8 items-center rounded-[7px] px-3.5 text-[13.5px] font-medium text-muted transition-colors hover:text-ink";

export const CompanyTabs = ({ companyId }: CompanyTabsProps) => (
  <nav className="inline-flex w-fit gap-1 rounded-(--radius-control) bg-surface-2 p-1">
    <Link
      to="/companies/$companyId"
      params={{ companyId }}
      activeOptions={{ exact: true }}
      activeProps={ACTIVE_PROPS}
      className={TAB_CLASS}
    >
      Обзор
    </Link>
    <Link
      to="/companies/$companyId/plan"
      params={{ companyId }}
      activeProps={ACTIVE_PROPS}
      className={TAB_CLASS}
    >
      Этапы
    </Link>
  </nav>
);
