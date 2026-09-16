import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";

import { PageHeader } from "@/shared/components/common/page-header";
import { buttonVariants } from "@/shared/constants/button-variants";
import { RunSession } from "@/widgets/run/run-session/components/run-session";
import { TodayStats } from "@/widgets/today/today-stats/components/today-stats";
import { TodayUpcoming } from "@/widgets/today/today-upcoming/components/today-upcoming";

export const TodayPage = () => (
  <div className="flex flex-col gap-6">
    <PageHeader
      title="Сегодня"
      description="Одно действие за раз. Дальше решает воронка."
      actions={
        <Link to="/run" className={buttonVariants({ variant: "primary" })}>
          <Play className="size-4" />
          Продолжить поиск
        </Link>
      }
    />

    <TodayStats />

    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-ink">Следующее действие</h2>
      <RunSession />
    </section>

    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-ink">Ближайшее</h2>
      <TodayUpcoming />
    </section>
  </div>
);
