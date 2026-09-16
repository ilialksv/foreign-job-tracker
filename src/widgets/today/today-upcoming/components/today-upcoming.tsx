import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useTodayUpcoming } from "../hooks/use-today-upcoming";
import { TodayUpcomingTask } from "./today-upcoming-task";

export const TodayUpcoming = () => {
  const { companyNameById, groups, isLoading } = useTodayUpcoming();

  if (isLoading) {
    return <TodayUpcomingSkeleton />;
  }

  if (groups.length === 0) {
    return (
      <p className="py-1 text-[13px] text-muted">
        Запланированных задач нет — follow-up появятся сами, как только
        отправишь коннекты.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.key} className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <h3 className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {group.title}
            </h3>
            <span className="font-mono text-[11px] text-muted tabular-nums">
              {group.tasks.length}
            </span>
          </div>
          <div className="flex flex-col">
            {group.tasks.map((task) => (
              <TodayUpcomingTask
                key={task.id}
                task={task}
                companyName={
                  task.companyId
                    ? companyNameById.get(task.companyId)
                    : "Без компании"
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const TodayUpcomingSkeleton = () => (
  <div className="flex flex-col gap-3">
    <ItemsList
      count={4}
      renderItem={(index) => <Skeleton key={index} className="h-12 w-full" />}
    />
  </div>
);
