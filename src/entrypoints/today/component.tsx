import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/shared/components/common/page-header";
import { Section } from "@/shared/components/layouts/section";
import { buttonVariants } from "@/shared/constants/button-variants";
import { RunSession } from "@/widgets/run/run-session/components/run-session";
import { TodayPipeline } from "@/widgets/today/today-pipeline/components/today-pipeline";
import { TodayUpcoming } from "@/widgets/today/today-upcoming/components/today-upcoming";

export const TodayPage = () => (
  <div className="flex flex-col gap-8">
    <PageHeader
      eyebrow="Сессия дня"
      title="Сегодня"
      description="Одно действие за раз. Что дальше — решает воронка."
      actions={
        <Link to="/run" className={buttonVariants({ variant: "primary" })}>
          Продолжить поиск
          <ArrowRight className="size-4" />
        </Link>
      }
    />

    <TodayPipeline />

    <RunSession />

    <Section
      title="Ближайшее"
      description="Просрочено, сегодня и неделя вперёд"
      divided
    >
      <TodayUpcoming />
    </Section>
  </div>
);
