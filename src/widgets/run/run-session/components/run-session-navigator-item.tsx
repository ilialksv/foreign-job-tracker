import { useCallback } from "react";

import { cn } from "@/shared/utils/cn";

import type { NavigationTask } from "../utils/get-navigation-tasks";

export type RunSessionNavigatorItemProps = {
  item: NavigationTask;
  index: number;
  isCurrent: boolean;
  onSelect: (params: { id: string }) => void;
};

export const RunSessionNavigatorItem = ({
  item,
  index,
  isCurrent,
  onSelect,
}: RunSessionNavigatorItemProps) => {
  const handleClick = useCallback(() => {
    onSelect({ id: item.task.id });
  }, [item.task.id, onSelect]);

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
      aria-current={isCurrent}
      className={cn(
        "flex h-9 shrink-0 items-center gap-2 rounded-(--radius-control) border px-2.5 text-[13px] transition-colors",
        {
          "border-accent bg-accent-soft text-ink": isCurrent,
          "border-line bg-surface text-ink-2 hover:border-line-2 hover:bg-surface-2":
            !isCurrent && item.isSelectable,
          "border-dashed border-line bg-transparent text-muted/70":
            !item.isSelectable,
        },
      )}
    >
      <span
        className={cn("font-mono text-[11px] tabular-nums", {
          "text-accent": isCurrent,
          "text-done": !isCurrent && item.mode === "completed",
          "text-muted": !isCurrent && item.mode !== "completed",
        })}
      >
        {index + 1}
      </span>
      <span
        className={cn("max-w-36 truncate", {
          "line-through decoration-line-2": item.task.status === "skipped",
        })}
      >
        {item.task.title}
      </span>
    </button>
  );
};
