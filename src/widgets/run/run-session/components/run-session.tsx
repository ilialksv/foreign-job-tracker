import { Link } from "@tanstack/react-router";
import { Copy } from "lucide-react";
import { useCallback } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { formatDateTime, formatRelativeDay } from "@/shared/utils/dates";

import { useRunSession } from "../hooks/use-run-session";
import { RunSessionForm } from "./run-session-form";
import { RunSessionNavigator } from "./run-session-navigator";

export type RunSessionProps = {
  companyId?: string;
  taskId?: string;
  onSelectTask?: (params: { id: string }) => void;
  onAfterComplete?: (params: { nextTaskId: string | null }) => void;
};

const POSTPONE_DAYS = { day: 1, threeDays: 3, week: 7 };

export const RunSession = ({
  companyId,
  taskId,
  onSelectTask,
  onAfterComplete,
}: RunSessionProps) => {
  const {
    blockedByTitles,
    canGoBack,
    canGoForward,
    company,
    currentMode,
    currentTask,
    handleBackClick,
    handleComplete,
    handleCopyTemplateClick,
    handleCustomDoneClick,
    handleForwardClick,
    handlePostponeClick,
    handleReopenClick,
    handleSaveAnswers,
    handleSelectTask,
    handleSkipClick,
    handleStartNextCompanyClick,
    isLoading,
    isMutating,
    navigationItems,
    nextQueuedCompany,
    remainingCount,
    step,
    templateText,
  } = useRunSession({ companyId, taskId, onSelectTask, onAfterComplete });

  const handlePostponeOneDay = useCallback(() => {
    handlePostponeClick({ days: POSTPONE_DAYS.day });
  }, [handlePostponeClick]);

  const handlePostponeThreeDays = useCallback(() => {
    handlePostponeClick({ days: POSTPONE_DAYS.threeDays });
  }, [handlePostponeClick]);

  const handlePostponeWeek = useCallback(() => {
    handlePostponeClick({ days: POSTPONE_DAYS.week });
  }, [handlePostponeClick]);

  if (isLoading) {
    return <RunSessionSkeleton />;
  }

  if (!currentTask) {
    return (
      <Plug
        title="На сегодня действий нет"
        description={
          nextQueuedCompany
            ? `Следующая в очереди — ${nextQueuedCompany.name}. Запустить по ней воронку?`
            : "Очередь пуста. Добавь компании или импортируй список в настройках."
        }
        action={
          nextQueuedCompany ? (
            <Button variant="primary" onClick={handleStartNextCompanyClick}>
              Взять {nextQueuedCompany.name}
            </Button>
          ) : null
        }
      />
    );
  }

  const isCompleted = currentMode === "completed";
  const isBlocked = currentMode === "blocked";

  return (
    <div className="flex flex-col gap-3">
      <RunSessionNavigator
        items={navigationItems}
        currentTaskId={currentTask.id}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onSelect={handleSelectTask}
        onBack={handleBackClick}
        onForward={handleForwardClick}
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>{currentTask.title}</CardTitle>
            {company ? (
              <Link
                to="/companies/$companyId"
                params={{ companyId: company.id }}
                className="text-accent text-xs"
              >
                {company.name}
              </Link>
            ) : (
              <span className="text-muted text-xs">Общая задача</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {isCompleted ? (
              <Badge tone="ok">
                {currentTask.status === "skipped" ? "пропущен" : "закрыт"}
                {currentTask.completedAt
                  ? ` ${formatDateTime(currentTask.completedAt)}`
                  : ""}
              </Badge>
            ) : (
              <>
                <Badge tone="outline">
                  {formatRelativeDay(currentTask.dueAt)}
                </Badge>
                <Badge tone="accent">осталось {remainingCount}</Badge>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {currentTask.description ? (
            <p className="text-muted text-sm">{currentTask.description}</p>
          ) : null}

          {templateText ? (
            <div className="border-line bg-surface-muted flex flex-col gap-2 rounded-lg border px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted text-xs font-medium tracking-wide uppercase">
                  Шаблон
                </span>
                <Button
                  size="sm"
                  icon={<Copy />}
                  onClick={handleCopyTemplateClick}
                >
                  Скопировать
                </Button>
              </div>
              <p className="text-ink text-sm whitespace-pre-wrap">
                {templateText}
              </p>
            </div>
          ) : null}

          {isBlocked ? (
            <p className="border-line text-muted rounded-lg border border-dashed px-3 py-3 text-sm">
              {blockedByTitles.length > 0
                ? `Шаг ждёт: ${blockedByTitles.join(", ")}`
                : "Шаг пока недоступен"}
            </p>
          ) : step ? (
            <RunSessionForm
              key={`${currentTask.id}-${currentTask.status}`}
              step={step}
              task={currentTask}
              isCompleted={isCompleted}
              isPending={isMutating}
              onComplete={handleComplete}
              onSaveAnswers={handleSaveAnswers}
              onReopen={handleReopenClick}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {isCompleted ? (
                <Button
                  variant="secondary"
                  disabled={isMutating}
                  onClick={handleReopenClick}
                >
                  Вернуть задачу в работу
                </Button>
              ) : (
                <Button
                  variant="primary"
                  disabled={isMutating}
                  onClick={handleCustomDoneClick}
                >
                  Сделано
                </Button>
              )}
            </div>
          )}

          {isCompleted || isBlocked ? null : (
            <div className="border-line flex flex-wrap items-center gap-2 border-t pt-3">
              <span className="text-muted text-xs">Отложить:</span>
              <Button size="sm" variant="ghost" onClick={handlePostponeOneDay}>
                на день
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handlePostponeThreeDays}
              >
                на 3 дня
              </Button>
              <Button size="sm" variant="ghost" onClick={handlePostponeWeek}>
                на неделю
              </Button>
              <Button size="sm" variant="ghost" onClick={handleSkipClick}>
                Пропустить шаг
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export const RunSessionSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-24" />
    </CardHeader>
    <CardContent className="flex flex-col gap-3">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-10 w-40" />
    </CardContent>
  </Card>
);
