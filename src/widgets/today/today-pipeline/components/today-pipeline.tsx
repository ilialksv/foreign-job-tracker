import { ItemsList } from "@/shared/components/common/items-list";
import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useTodayPipeline } from "../hooks/use-today-pipeline";

/** Точки в счётчиках повторяют цвета статусов на карточках компаний. */
const SEGMENT_DOT: Record<string, string> = {
  queued: "bg-ink/25",
  active: "bg-accent",
  waiting: "bg-attention",
  responded: "bg-done",
  closed: "bg-ink/10",
};

export const TodayPipeline = () => {
  const {
    actionableCount,
    isLoading,
    overdueCount,
    segments,
    total,
    weeklyDone,
    weeklyFillStyle,
    weeklyGoal,
  } = useTodayPipeline();

  if (isLoading) {
    return <TodayPipelineSkeleton />;
  }

  return (
    <Card className="flex flex-col gap-4 px-5 py-4">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[28px] leading-none font-semibold text-ink tabular-nums">
            {actionableCount}
          </span>
          <span className="text-[13.5px] text-ink-2">
            действий доступно сейчас
          </span>
        </div>
        {overdueCount > 0 ? (
          <span className="font-mono text-[12px] text-attention tabular-nums">
            просрочено {overdueCount}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <span className="text-[13px] text-ink-2">
            Компаний в работе на этой неделе
          </span>
          <span className="font-mono text-[12.5px] text-ink tabular-nums">
            {weeklyDone} из {weeklyGoal}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={weeklyGoal}
          aria-valuenow={weeklyDone}
          aria-label="Недельная цель по компаниям"
          className="h-2 w-full overflow-hidden rounded-full bg-surface-2"
        >
          <div className="h-full rounded-full bg-accent" style={weeklyFillStyle} />
        </div>
      </div>

      <dl className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-line pt-3">
        {segments.map((segment) => (
          <div key={segment.key} className="flex items-center gap-1.5">
            <span
              className={`size-1.5 shrink-0 rounded-full ${SEGMENT_DOT[segment.key]}`}
            />
            <dt className="text-[13px] text-muted">{segment.label}</dt>
            <dd className="font-mono text-[13px] text-ink tabular-nums">
              {segment.count}
            </dd>
          </div>
        ))}
        <div className="ml-auto font-mono text-[12px] text-muted tabular-nums">
          всего {total}
        </div>
      </dl>
    </Card>
  );
};

export const TodayPipelineSkeleton = () => (
  <Card className="flex flex-col gap-4 px-5 py-4">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-2 w-full rounded-full" />
    <div className="flex gap-4">
      <ItemsList
        count={5}
        renderItem={(index) => <Skeleton key={index} className="h-4 w-24" />}
      />
    </div>
  </Card>
);
