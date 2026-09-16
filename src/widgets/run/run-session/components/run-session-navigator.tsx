import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import type { NavigationTask } from "../utils/get-navigation-tasks";
import { RunSessionNavigatorItem } from "./run-session-navigator-item";

export type RunSessionNavigatorProps = {
  items: NavigationTask[];
  currentTaskId: string | null;
  canGoBack: boolean;
  canGoForward: boolean;
  onSelect: (params: { id: string }) => void;
  onBack: () => void;
  onForward: () => void;
};

export const RunSessionNavigator = ({
  items,
  currentTaskId,
  canGoBack,
  canGoForward,
  onSelect,
  onBack,
  onForward,
}: RunSessionNavigatorProps) => {
  if (items.length <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="secondary"
        size="icon"
        icon={<ChevronLeft />}
        disabled={!canGoBack}
        onClick={onBack}
        aria-label="Предыдущий шаг"
      />
      <div className="flex flex-1 gap-1.5 overflow-x-auto py-0.5">
        {items.map((item, index) => (
          <RunSessionNavigatorItem
            key={item.task.id}
            item={item}
            index={index}
            isCurrent={item.task.id === currentTaskId}
            onSelect={onSelect}
          />
        ))}
      </div>
      <Button
        variant="secondary"
        size="icon"
        icon={<ChevronRight />}
        disabled={!canGoForward}
        onClick={onForward}
        aria-label="Следующий шаг"
      />
    </div>
  );
};
