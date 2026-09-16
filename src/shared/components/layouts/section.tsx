import type { ReactNode } from "react";

import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/cn";

export type SectionProps = {
  title: string;
  description?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  /** Заголовок и содержимое на общей белой поверхности. */
  surface?: boolean;
  /** Содержимое — список со строками-разделителями: шапка отбивается линией. */
  divided?: boolean;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
};

const SectionHeader = ({
  title,
  description,
  meta,
  actions,
  className,
}: Pick<
  SectionProps,
  "title" | "description" | "meta" | "actions" | "className"
>) => (
  <header
    className={cn(
      "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1",
      className,
    )}
  >
    <div className="flex items-baseline gap-2.5">
      <h2 className="font-display text-[15px] leading-6 font-semibold text-ink">
        {title}
      </h2>
      {meta ? (
        <span className="font-mono text-[12px] text-muted tabular-nums">
          {meta}
        </span>
      ) : null}
    </div>
    {actions}
    {description ? (
      <p className="w-full text-[12.5px] text-muted">{description}</p>
    ) : null}
  </header>
);

export const Section = ({
  title,
  description,
  meta,
  actions,
  surface = true,
  divided = false,
  className,
  contentClassName,
  children,
}: SectionProps) => {
  if (!surface) {
    return (
      <section className={cn("flex flex-col gap-2.5", className)}>
        <SectionHeader
          title={title}
          description={description}
          meta={meta}
          actions={actions}
        />
        <div className={cn("flex flex-col", contentClassName)}>{children}</div>
      </section>
    );
  }

  return (
    <Card className={cn("flex flex-col", className)}>
      <SectionHeader
        title={title}
        description={description}
        meta={meta}
        actions={actions}
        className={cn("px-4 pt-3.5 pb-2.5", {
          "border-b border-line pb-3": divided,
        })}
      />
      <div
        className={cn("px-4 pb-3.5", { "pt-0.5": divided }, contentClassName)}
      >
        {children}
      </div>
    </Card>
  );
};
