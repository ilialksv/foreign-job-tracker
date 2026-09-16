import { Link } from "@tanstack/react-router";
import { Copy } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Panel } from "@/shared/components/ui/panel";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";

import { useRunSession } from "../hooks/use-run-session";
import type { PostponeOption } from "./run-session-postpone-button";
import { RunSessionPostponeButton } from "./run-session-postpone-button";
import { RunSessionForm } from "./run-session-form";
import { RunSessionNavigator } from "./run-session-navigator";

export type RunSessionProps = {
  companyId?: string;
  taskId?: string;
  onSelectTask?: (params: { id: string }) => void;
  onAfterComplete?: (params: { nextTaskId: string | null }) => void;
};

const POSTPONE_OPTIONS: PostponeOption[] = [
  { days: 1, label: "на день" },
  { days: 3, label: "на 3 дня" },
  { days: 7, label: "на неделю" },
];

export const RunSession = ({
  companyId,
  taskId,
  onSelectTask,
  onAfterComplete,
}: RunSessionProps) => {
  const {
    canGoBack,
    canGoForward,
    company,
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
    isBlocked,
    isCompleted,
    isLoading,
    isMutating,
    navigationItems,
    nextQueuedCompany,
    remainingCount,
    stateLabel,
    step,
    templateText,
  } = useRunSession({ companyId, taskId, onSelectTask, onAfterComplete });

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

  return (
    <div className="flex flex-col gap-4">
      <RunSessionNavigator
        items={navigationItems}
        currentTaskId={currentTask.id}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onSelect={handleSelectTask}
        onBack={handleBackClick}
        onForward={handleForwardClick}
      />

      <Panel className="flex flex-col gap-5 px-5 py-5">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            {company ? (
              <Link
                to="/companies/$companyId"
                params={{ companyId: company.id }}
                className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase hover:text-ink"
              >
                {company.name}
              </Link>
            ) : (
              <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                Общая задача
              </span>
            )}
            <div className="flex items-center gap-3">
              <span
                className={cn("font-mono text-[12px] tabular-nums", {
                  "text-done": isCompleted,
                  "text-attention": isBlocked,
                  "text-muted": !isCompleted && !isBlocked,
                })}
              >
                {stateLabel}
              </span>
              {!isCompleted && !isBlocked && remainingCount > 1 ? (
                <span className="font-mono text-[12px] text-muted tabular-nums">
                  осталось {remainingCount}
                </span>
              ) : null}
            </div>
          </div>
          <h2 className="font-display text-[20px] leading-7 font-semibold text-ink">
            {currentTask.title}
          </h2>
          {currentTask.description ? (
            <p className="max-w-prose text-[14px] leading-relaxed text-ink-2">
              {currentTask.description}
            </p>
          ) : null}
        </header>

        {templateText ? (
          <div className="flex flex-col gap-2 rounded-(--radius-control) bg-surface-2 px-3.5 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                Шаблон
              </span>
              <Button
                size="sm"
                variant="ghost"
                icon={<Copy />}
                onClick={handleCopyTemplateClick}
              >
                Скопировать
              </Button>
            </div>
            <p className="font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-ink-2">
              {templateText}
            </p>
          </div>
        ) : null}

        {isBlocked ? (
          <p className="rounded-(--radius-control) bg-surface-2 px-3.5 py-3 text-[13px] text-muted">
            Сначала нужно закрыть предыдущие шаги.
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
          <footer className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[12.5px] text-muted">Отложить</span>
            {POSTPONE_OPTIONS.map((option) => (
              <RunSessionPostponeButton
                key={option.days}
                option={option}
                onSelect={handlePostponeClick}
              />
            ))}
            <Button
              size="sm"
              variant="ghost"
              className="ml-auto"
              onClick={handleSkipClick}
            >
              Пропустить шаг
            </Button>
          </footer>
        )}
      </Panel>
    </div>
  );
};

export const RunSessionSkeleton = () => (
  <Panel className="flex flex-col gap-4 px-5 py-5">
    <Skeleton className="h-3 w-32" />
    <Skeleton className="h-6 w-56" />
    <Skeleton className="h-16 w-full" />
    <Skeleton className="h-10 w-48" />
  </Panel>
);
