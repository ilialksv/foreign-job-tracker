import { Check } from "lucide-react";
import { useCallback, useMemo } from "react";

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

  const isDone = item.mode === "completed";

  const hint = useMemo(() => {
    if (item.blockedBy.length > 0) {
      return `Ждёт: ${item.blockedBy.join(", ")}`;
    }

    return item.caption.length > 0
      ? `${item.label} — ${item.caption}`
      : item.label;
  }, [item.blockedBy, item.caption, item.label]);

  return (
    <button
      type="button"
      disabled={!item.isSelectable}
      onClick={handleClick}
      title={hint}
      aria-current={isCurrent}
      className={cn(
        "flex h-9 max-w-64 shrink-0 items-center gap-2 rounded-(--radius-control) border px-2.5 text-[13px] transition-colors",
        {
          "border-accent bg-accent text-accent-ink": isCurrent,
          "border-line bg-surface text-ink-2 hover:border-line-2 hover:bg-surface-2":
            !isCurrent && item.isSelectable,
          "border-dashed border-line bg-transparent text-muted/70":
            !isCurrent && !item.isSelectable,
        },
      )}
    >
      {isDone && !isCurrent ? (
        <Check className="size-3.5 shrink-0 text-done" />
      ) : (
        <span
          className={cn("shrink-0 font-mono text-[11px] tabular-nums", {
            "text-accent-ink/70": isCurrent,
            "text-muted": !isCurrent,
          })}
        >
          {index + 1}
        </span>
      )}
      <span
        className={cn("truncate font-medium", {
          "line-through decoration-line-2": item.task.status === "skipped",
          "text-ink": !isCurrent && item.isSelectable,
        })}
      >
        {item.label}
      </span>
      {item.caption.length > 0 ? (
        <span
          className={cn("truncate text-[12px]", {
            "text-accent-ink/75": isCurrent,
            "text-muted": !isCurrent,
          })}
        >
          {item.caption}
        </span>
      ) : null}
    </button>
  );
};
