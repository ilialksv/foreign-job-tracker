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
  <div className={cn("flex flex-col gap-1.5", className)}>
    {labelText || action ? (
      <div className="flex items-center justify-between gap-2">
        {labelText ? (
          <label
            htmlFor={labelHtmlFor}
            className="text-muted text-xs font-medium tracking-wide uppercase"
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
        className={cn("text-xs", {
          "text-danger": messageVariant === "error",
          "text-muted": messageVariant === "hint",
        })}
      >
        {message}
      </span>
    ) : null}
  </div>
);
