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
import { formatRelativeDay } from "@/shared/utils/dates";

import { useRunSession } from "../hooks/use-run-session";
import { RunSessionFields } from "./run-session-fields";
import { RunSessionOptionButton } from "./run-session-options";

export type RunSessionProps = {
  companyId?: string;
};

const POSTPONE_OPTIONS = [1, 3, 7];

export const RunSession = ({ companyId }: RunSessionProps) => {
  const {
    answers,
    company,
    currentTask,
    handleAnswerChange,
    handleCopyTemplateClick,
    handleCustomDone,
    handleOptionClick,
    handlePostponeClick,
    handleSkipClick,
    handleStartNextCompanyClick,
    isLoading,
    isMutating,
    nextQueuedCompany,
    remainingCount,
    step,
    templateText,
  } = useRunSession({ companyId });

  const handlePostponeOneDay = useCallback(() => {
    handlePostponeClick({ days: POSTPONE_OPTIONS[0] });
  }, [handlePostponeClick]);

  const handlePostponeThreeDays = useCallback(() => {
    handlePostponeClick({ days: POSTPONE_OPTIONS[1] });
  }, [handlePostponeClick]);

  const handlePostponeWeek = useCallback(() => {
    handlePostponeClick({ days: POSTPONE_OPTIONS[2] });
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

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>{currentTask.title}</CardTitle>
          {company ? (
            <Link
              to="/companies/$companyId"
              params={{ companyId: company.id }}
              className="text-xs text-accent"
            >
              {company.name}
            </Link>
          ) : (
            <span className="text-xs text-muted">Общая задача</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="outline">{formatRelativeDay(currentTask.dueAt)}</Badge>
          <Badge tone="accent">осталось {remainingCount}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {currentTask.description ? (
          <p className="text-sm text-muted">{currentTask.description}</p>
        ) : null}

        {step ? (
          <RunSessionFields
            fields={step.fields}
            answers={answers}
            onChange={handleAnswerChange}
          />
        ) : null}

        {templateText ? (
          <div className="flex flex-col gap-2 rounded-lg border border-line bg-surface-muted px-3 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium tracking-wide text-muted uppercase">
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
            <p className="text-sm whitespace-pre-wrap text-ink">
              {templateText}
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {step ? (
            step.options.map((option) => (
              <RunSessionOptionButton
                key={option.value}
                option={option}
                disabled={isMutating}
                onSelect={handleOptionClick}
              />
            ))
          ) : (
            <Button
              variant="primary"
              disabled={isMutating}
              onClick={handleCustomDone}
            >
              Сделано
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-line pt-3">
          <span className="text-xs text-muted">Отложить:</span>
          <Button size="sm" variant="ghost" onClick={handlePostponeOneDay}>
            на день
          </Button>
          <Button size="sm" variant="ghost" onClick={handlePostponeThreeDays}>
            на 3 дня
          </Button>
          <Button size="sm" variant="ghost" onClick={handlePostponeWeek}>
            на неделю
          </Button>
          <Button size="sm" variant="ghost" onClick={handleSkipClick}>
            Пропустить шаг
          </Button>
        </div>
      </CardContent>
    </Card>
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
