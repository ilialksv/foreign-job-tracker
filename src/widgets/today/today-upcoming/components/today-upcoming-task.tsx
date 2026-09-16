import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useCallback } from "react";

import { TaskRow } from "@/features/tasks/task-row/components/task-row";
import type { Task } from "@/shared/types/entities";

export type TodayUpcomingTaskProps = {
  task: Task;
  companyName?: string;
};

export const TodayUpcomingTask = ({
  task,
  companyName,
}: TodayUpcomingTaskProps) => {
  const companyId = task.companyId;

  const renderContent = useCallback(
    (content: ReactNode) => {
      if (!companyId) {
        return content;
      }

      return (
        <Link
          to="/companies/$companyId/plan/$taskId"
          params={{ companyId, taskId: task.id }}
          className="min-w-0 flex-1 rounded-(--radius-control) transition-opacity hover:opacity-80"
        >
          {content}
        </Link>
      );
    },
    [companyId, task.id],
  );

  return (
    <TaskRow
      task={task}
      companyName={companyName}
      emphasis="company"
      renderContent={renderContent}
    />
  );
};
