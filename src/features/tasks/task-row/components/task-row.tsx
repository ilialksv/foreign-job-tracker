import type { ReactNode } from "react";

import { TaskDueBadge } from "@/features/tasks/task-due-badge/components/task-due-badge";
import { StatusDot } from "@/shared/components/ui/status-dot";
import type { BadgeTone } from "@/shared/constants/company";
import type { Task } from "@/shared/types/entities";
import { cn } from "@/shared/utils/cn";

export type TaskRowProps = {
  task: Task;
  companyName?: string;
  blocked?: boolean;
  actions?: ReactNode;
  /** Обёртка вокруг содержимого строки: сюда передают ссылку на элемент. */
  renderContent?: (content: ReactNode) => ReactNode;
};

const getTone = (params: { task: Task; blocked: boolean }): BadgeTone => {
  if (params.task.status === "done") {
    return "ok";
  }

  if (params.task.status === "skipped") {
    return "outline";
  }

  return params.blocked ? "outline" : "accent";
};

export const TaskRow = ({
  task,
  companyName,
  blocked = false,
  actions,
  renderContent,
}: TaskRowProps) => {
  const tone = getTone({ task, blocked });
  const isClosed = task.status === "done" || task.status === "skipped";

  const content = (
    <div className="flex min-w-0 items-start gap-2.5">
      <StatusDot tone={tone} className="mt-2" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span
          className={cn("text-[14px] leading-5 font-medium", {
            "text-ink": !isClosed,
            "text-muted": isClosed,
            "line-through decoration-line-2": task.status === "skipped",
          })}
        >
          {task.title}
        </span>
        {companyName ? (
          <span className="truncate text-[12.5px] text-muted">
            {companyName}
          </span>
        ) : null}
        {task.description ? (
          <p className="line-clamp-2 max-w-prose text-[12.5px] leading-relaxed text-muted">
            {task.description}
          </p>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="flex items-start justify-between gap-3 border-b border-line py-2.5 last:border-b-0">
      {renderContent ? renderContent(content) : content}
      <div className="flex shrink-0 items-center gap-2 pt-0.5">
        <TaskDueBadge dueAt={task.dueAt} blocked={blocked} />
        {actions}
      </div>
    </div>
  );
};
