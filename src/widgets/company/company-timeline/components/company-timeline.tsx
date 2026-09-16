import { Section } from "@/shared/components/layouts/section";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { formatDateTime } from "@/shared/utils/dates";

import { useCompanyTimeline } from "../hooks/use-company-timeline";

export type CompanyTimelineProps = {
  companyId: string;
};

export const CompanyTimeline = ({ companyId }: CompanyTimelineProps) => {
  const { events, isLoading } = useCompanyTimeline({ companyId });

  return (
    <Section title="История" meta={events.length} divided>
      <div className="flex flex-col gap-3.5">
        {isLoading ? (
          <CompanyTimelineSkeleton />
        ) : events.length === 0 ? (
          <p className="text-[13px] text-muted">
            Здесь появятся закрытые шаги и отправленные сообщения.
          </p>
        ) : (
          <ol className="flex flex-col">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex items-baseline justify-between gap-3 border-b border-line py-2 last:border-b-0"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[13.5px] text-ink">{event.title}</span>
                  {event.details ? (
                    <span className="line-clamp-2 text-[12.5px] text-muted">
                      {event.details}
                    </span>
                  ) : null}
                </div>
                <span className="shrink-0 font-mono text-[11px] text-muted tabular-nums">
                  {formatDateTime(event.createdAt)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Section>
  );
};

export const CompanyTimelineSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);
