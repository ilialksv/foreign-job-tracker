import type { ReactNode } from "react";

import { TaskDueBadge } from "@/features/tasks/task-due-badge/components/task-due-badge";
import { Badge } from "@/shared/components/ui/badge";
import {
  TASK_STATUS_LABELS,
  TASK_STATUS_TONES,
} from "@/shared/constants/tasks";
import type { Task } from "@/shared/types/entities";

export type TaskRowProps = {
  task: Task;
  companyName?: string;
  blocked?: boolean;
  actions?: ReactNode;
  /** Обёртка вокруг содержимого строки: сюда передают ссылку на элемент. */
  renderContent?: (content: ReactNode) => ReactNode;
};

export const TaskRow = ({
  task,
  companyName,
  blocked = false,
  actions,
  renderContent,
}: TaskRowProps) => {
  const content = (
    <div className="flex min-w-0 flex-col gap-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-ink text-sm font-medium">{task.title}</span>
        {task.kind === "custom" ? <Badge tone="outline">своя</Badge> : null}
        <Badge tone={TASK_STATUS_TONES[task.status]}>
          {TASK_STATUS_LABELS[task.status]}
        </Badge>
        <TaskDueBadge dueAt={task.dueAt} blocked={blocked} />
      </div>
      {companyName ? (
        <span className="text-muted text-xs">{companyName}</span>
      ) : null}
      {task.description ? (
        <p className="text-muted max-w-2xl text-sm">{task.description}</p>
      ) : null}
    </div>
  );

  return (
    <div className="border-line flex flex-wrap items-start justify-between gap-3 border-b py-3 last:border-b-0">
      {renderContent ? renderContent(content) : content}
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
};
