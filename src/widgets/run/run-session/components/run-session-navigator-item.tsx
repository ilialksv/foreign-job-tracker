import { useCallback } from "react";

import { cn } from "@/shared/utils/cn";

import type { NavigationTask } from "../utils/get-navigation-tasks";

export type RunSessionNavigatorItemProps = {
  item: NavigationTask;
  index: number;
  isCurrent: boolean;
  onSelect: (params: { id: string }) => void;
};

const MODE_DOT_CLASS = {
  active: "bg-accent",
  completed: "bg-ok",
  blocked: "bg-muted/40",
} as const;

export const RunSessionNavigatorItem = ({
  item,
  index,
  isCurrent,
  onSelect,
}: RunSessionNavigatorItemProps) => {
  const handleClick = useCallback(() => {
    onSelect({ id: item.task.id });
  }, [item.task.id, onSelect]);

  const isSkipped = item.task.status === "skipped";
  const hint =
    item.blockedBy.length > 0
      ? `Ждёт: ${item.blockedBy.join(", ")}`
      : item.task.title;

  return (
    <button
      type="button"
      disabled={!item.isSelectable}
      onClick={handleClick}
      title={hint}
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-colors",
        {
          "border-accent bg-accent-soft text-ink": isCurrent,
          "border-line bg-surface text-muted hover:text-ink":
            !isCurrent && item.isSelectable,
          "border-line text-muted/60 cursor-not-allowed border-dashed":
            !item.isSelectable,
          "line-through": isSkipped,
        },
      )}
    >
      <span
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          MODE_DOT_CLASS[item.mode],
        )}
      />
      <span className="tabular-nums">{index + 1}.</span>
      <span className="max-w-40 truncate">{item.task.title}</span>
    </button>
  );
};
