import { useCallback } from "react";

import { TaskRow } from "@/features/tasks/task-row/components/task-row";
import { Button } from "@/shared/components/ui/button";
import type { Task } from "@/shared/types/entities";

export type CompanyPlanTaskProps = {
  task: Task;
  blocked: boolean;
  onSkip: (params: { id: string }) => void;
  onRemove: (params: { id: string }) => void;
};

export const CompanyPlanTask = ({
  task,
  blocked,
  onSkip,
  onRemove,
}: CompanyPlanTaskProps) => {
  const handleSkipClick = useCallback(() => {
    onSkip({ id: task.id });
  }, [onSkip, task.id]);

  const handleRemoveClick = useCallback(() => {
    onRemove({ id: task.id });
  }, [onRemove, task.id]);

  const isOpen = task.status === "todo" || task.status === "in_progress";

  return (
    <TaskRow
      task={task}
      blocked={blocked}
      actions={
        <>
          {isOpen ? (
            <Button size="sm" variant="ghost" onClick={handleSkipClick}>
              Пропустить
            </Button>
          ) : null}
          {task.kind === "custom" ? (
            <Button size="sm" variant="ghost" onClick={handleRemoveClick}>
              Удалить
            </Button>
          ) : null}
        </>
      }
    />
  );
};
