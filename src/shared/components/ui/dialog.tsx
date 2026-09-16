import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export type DialogContentProps = ComponentProps<
  typeof DialogPrimitive.Content
> & {
  title: string;
  description?: string;
  footer?: ReactNode;
};

export const DialogContent = ({
  title,
  description,
  footer,
  className,
  children,
  ...props
}: DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/25 backdrop-blur-[2px]" />
    <DialogPrimitive.Content
      className={cn(
        "fixed top-1/2 left-1/2 z-50 flex max-h-[90dvh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-(--radius-panel) border border-line bg-raised shadow-(--shadow-raised)",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex flex-col gap-1">
          <DialogPrimitive.Title className="font-display text-[16px] leading-6 font-semibold text-ink">
            {title}
          </DialogPrimitive.Title>
          {description ? (
            <DialogPrimitive.Description className="max-w-prose text-[12.5px] leading-relaxed text-muted">
              {description}
            </DialogPrimitive.Description>
          ) : null}
        </div>
        <DialogPrimitive.Close
          aria-label="Закрыть"
          className="cursor-pointer rounded-md p-1 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      {footer ? (
        <div className="flex justify-end gap-2 border-t border-line bg-surface px-5 py-3.5">
          {footer}
        </div>
      ) : null}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
