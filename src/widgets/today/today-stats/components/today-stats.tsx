import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useTodayStats } from "../hooks/use-today-stats";

export const TodayStats = () => {
  const stats = useTodayStats();

  if (stats.isLoading) {
    return <TodayStatsSkeleton />;
  }

  const tiles = [
    { label: "Действий сегодня", value: stats.actionable },
    { label: "В работе", value: stats.active },
    { label: "Ждём ответа", value: stats.waiting },
    { label: "Ответили", value: stats.responded },
    { label: "В очереди", value: stats.queued },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="flex flex-col gap-1 rounded-xl border border-line bg-surface px-4 py-3"
        >
          <span className="text-2xl font-semibold text-ink tabular-nums">
            {tile.value}
          </span>
          <span className="text-xs text-muted">{tile.label}</span>
        </div>
      ))}
    </div>
  );
};

export const TodayStatsSkeleton = () => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
    <ItemsList
      count={5}
      renderItem={(index) => <Skeleton key={index} className="h-20 w-full" />}
    />
  </div>
);
