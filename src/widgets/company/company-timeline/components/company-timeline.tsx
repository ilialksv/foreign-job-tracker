import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { formatDateTime } from "@/shared/utils/dates";

import { useCompanyTimeline } from "../hooks/use-company-timeline";

export type CompanyTimelineProps = {
  companyId: string;
};

export const CompanyTimeline = ({ companyId }: CompanyTimelineProps) => {
  const { events, isLoading } = useCompanyTimeline({ companyId });

  return (
    <Card>
      <CardHeader>
        <CardTitle>История</CardTitle>
        <span className="text-xs text-muted">{events.length}</span>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <CompanyTimelineSkeleton />
        ) : events.length === 0 ? (
          <p className="text-sm text-muted">
            Здесь появятся закрытые шаги и отправленные сообщения.
          </p>
        ) : (
          <ol className="flex flex-col">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex flex-col gap-0.5 border-b border-line py-2 last:border-b-0"
              >
                <span className="text-sm text-ink">{event.title}</span>
                {event.details ? (
                  <span className="text-sm text-muted">{event.details}</span>
                ) : null}
                <span className="text-xs text-muted">
                  {formatDateTime(event.createdAt)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
};

export const CompanyTimelineSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);
