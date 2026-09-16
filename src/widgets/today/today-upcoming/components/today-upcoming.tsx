import { ItemsList } from "@/shared/components/common/items-list";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Plug } from "@/shared/components/ui/plug";
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
      <Plug
        title="Запланированных задач нет"
        description="Follow-up появятся автоматически, как только отправишь коннекты."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <Card key={group.key}>
          <CardHeader>
            <CardTitle>{group.title}</CardTitle>
            <span className="text-muted text-xs">{group.tasks.length}</span>
          </CardHeader>
          <CardContent className="py-0">
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const TodayUpcomingSkeleton = () => (
  <div className="flex flex-col gap-3">
    <ItemsList
      count={3}
      renderItem={(index) => <Skeleton key={index} className="h-24 w-full" />}
    />
  </div>
);
