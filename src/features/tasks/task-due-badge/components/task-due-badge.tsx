import { formatRelativeDay, getDaysFromToday } from "@/shared/utils/dates";
import { cn } from "@/shared/utils/cn";

export type TaskDueBadgeProps = {
  dueAt: string | null;
  blocked?: boolean;
};

export const TaskDueBadge = ({ dueAt, blocked = false }: TaskDueBadgeProps) => {
  if (blocked) {
    return (
      <span className="font-mono text-[12px] text-muted">заблокировано</span>
    );
  }

  if (!dueAt) {
    return <span className="font-mono text-[12px] text-muted">—</span>;
  }

  const isOverdue = getDaysFromToday(dueAt) < 0;

  return (
    <span
      className={cn("font-mono text-[12px] whitespace-nowrap tabular-nums", {
        "text-attention": isOverdue,
        "text-muted": !isOverdue,
      })}
    >
      {formatRelativeDay(dueAt)}
    </span>
  );
};
