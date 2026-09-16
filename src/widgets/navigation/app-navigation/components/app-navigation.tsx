import { Link } from "@tanstack/react-router";
import { Building2, CalendarCheck, FileText, Settings } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Сегодня", Icon: CalendarCheck },
  { to: "/companies", label: "Компании", Icon: Building2 },
  { to: "/templates", label: "Шаблоны", Icon: FileText },
  { to: "/settings", label: "Настройки", Icon: Settings },
] as const;

const ACTIVE_PROPS = { className: "text-accent" };

export const AppNavigation = () => (
  <>
    <header className="sticky top-0 z-30 hidden border-b border-line bg-surface md:block">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <span className="text-sm font-semibold text-ink">Foreign Job</span>
        <div className="flex items-center gap-5">
          {ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={ACTIVE_PROPS}
              className="flex items-center gap-2 text-sm text-muted hover:text-ink"
            >
              <item.Icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>

    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-surface pb-[env(safe-area-inset-bottom,0px)] md:hidden">
      {ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          activeOptions={{ exact: item.to === "/" }}
          activeProps={ACTIVE_PROPS}
          className="flex flex-1 flex-col items-center gap-1 py-2 text-xs text-muted"
        >
          <item.Icon className="size-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  </>
);
