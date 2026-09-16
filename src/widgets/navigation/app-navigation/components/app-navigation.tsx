import { Link } from "@tanstack/react-router";
import { Building2, CalendarCheck, FileText, Settings2 } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Сегодня", Icon: CalendarCheck },
  { to: "/companies", label: "Компании", Icon: Building2 },
  { to: "/templates", label: "Шаблоны", Icon: FileText },
  { to: "/settings", label: "Настройки", Icon: Settings2 },
] as const;

const DESKTOP_ACTIVE_PROPS = {
  className: "bg-surface-2 text-ink",
};

const MOBILE_ACTIVE_PROPS = {
  className: "text-accent",
};

export const AppNavigation = () => (
  <>
    <aside className="sticky top-0 hidden h-dvh flex-col gap-6 border-r border-line bg-surface px-3 py-5 md:flex">
      <div className="flex flex-col gap-0.5 px-2">
        <span className="font-display text-[15px] leading-5 font-semibold text-ink">
          Foreign Job
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
          ОАЭ · фронтенд
        </span>
      </div>

      <nav className="flex flex-col gap-0.5">
        {ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            activeProps={DESKTOP_ACTIVE_PROPS}
            className="flex items-center gap-2.5 rounded-(--radius-control) px-2.5 py-2 text-[14px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <item.Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>

    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur md:hidden">
      {ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          activeOptions={{ exact: item.to === "/" }}
          activeProps={MOBILE_ACTIVE_PROPS}
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-muted"
        >
          <item.Icon className="size-[18px]" />
          {item.label}
        </Link>
      ))}
    </nav>
  </>
);
