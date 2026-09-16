import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export type FieldLayoutProps = {
  labelHtmlFor?: string;
  labelText?: string | null;
  action?: ReactNode;
  message?: string | null;
  messageVariant?: "error" | "hint";
  className?: string;
  children?: ReactNode;
};

export const FieldLayout = ({
  labelHtmlFor,
  labelText,
  action,
  message,
  messageVariant = "error",
  className,
  children,
}: FieldLayoutProps) => (
  <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
    {labelText || action ? (
      <div className="flex items-center justify-between gap-2">
        {labelText ? (
          <label
            htmlFor={labelHtmlFor}
            className="text-[13px] font-medium text-ink-2"
          >
            {labelText}
          </label>
        ) : null}
        {action}
      </div>
    ) : null}
    {children}
    {message ? (
      <span
        className={cn("text-[12px] leading-4", {
          "text-stop": messageVariant === "error",
          "text-muted": messageVariant === "hint",
        })}
      >
        {message}
      </span>
    ) : null}
  </div>
);
