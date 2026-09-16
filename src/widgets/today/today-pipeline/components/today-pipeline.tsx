import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { StatusDot } from "@/shared/components/ui/status-dot";

import { useTodayPipeline } from "../hooks/use-today-pipeline";

const SEGMENT_FILL = {
  neutral: "bg-line-2",
  accent: "bg-accent",
  warn: "bg-attention",
  ok: "bg-done",
  outline: "bg-line",
  danger: "bg-stop",
} as const;

export const TodayPipeline = () => {
  const {
    actionableCount,
    isLoading,
    overdueCount,
    segments,
    total,
    weeklyGoal,
  } = useTodayPipeline();

  if (isLoading) {
    return <TodayPipelineSkeleton />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <p className="text-[14px] text-ink-2">
          <span className="font-display text-[22px] font-semibold text-ink tabular-nums">
            {actionableCount}
          </span>{" "}
          действий доступно сейчас
        </p>
        {overdueCount > 0 ? (
          <p className="text-[13px] text-attention">
            просрочено {overdueCount}
          </p>
        ) : null}
        <p className="ml-auto font-mono text-[12px] text-muted tabular-nums">
          цель {weeklyGoal} компаний в неделю
        </p>
      </div>

      {total > 0 ? (
        <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          {segments.map((segment) =>
            segment.count === 0 ? null : (
              <div
                key={segment.key}
                style={{ width: `${segment.share * 100}%` }}
                className={SEGMENT_FILL[segment.tone]}
                title={`${segment.label}: ${segment.count}`}
              />
            ),
          )}
        </div>
      ) : null}

      <dl className="flex flex-wrap gap-x-5 gap-y-1.5">
        {segments.map((segment) => (
          <div key={segment.key} className="flex items-center gap-1.5">
            <StatusDot tone={segment.tone} />
            <dt className="text-[13px] text-muted">{segment.label}</dt>
            <dd className="font-mono text-[13px] text-ink tabular-nums">
              {segment.count}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export const TodayPipelineSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="h-7 w-64" />
    <Skeleton className="h-1.5 w-full" />
    <div className="flex gap-4">
      <ItemsList
        count={5}
        renderItem={(index) => <Skeleton key={index} className="h-4 w-24" />}
      />
    </div>
  </div>
);
