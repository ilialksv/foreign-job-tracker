import { Badge } from "@/shared/components/ui/badge";
import { formatRelativeDay, isDue } from "@/shared/utils/dates";

export type TaskDueBadgeProps = {
  dueAt: string | null;
  blocked?: boolean;
};

export const TaskDueBadge = ({ dueAt, blocked = false }: TaskDueBadgeProps) => {
  if (blocked) {
    return <Badge tone="neutral">заблокировано</Badge>;
  }

  if (!dueAt) {
    return <Badge tone="outline">без даты</Badge>;
  }

  return (
    <Badge tone={isDue(dueAt) ? "warn" : "outline"}>
      {formatRelativeDay(dueAt)}
    </Badge>
  );
};
