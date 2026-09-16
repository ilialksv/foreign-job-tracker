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
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40" />
    <DialogPrimitive.Content
      className={cn(
        "fixed top-1/2 left-1/2 z-50 flex max-h-[90dvh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-line bg-surface",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex flex-col gap-1">
          <DialogPrimitive.Title className="text-sm font-semibold text-ink">
            {title}
          </DialogPrimitive.Title>
          {description ? (
            <DialogPrimitive.Description className="text-xs text-muted">
              {description}
            </DialogPrimitive.Description>
          ) : null}
        </div>
        <DialogPrimitive.Close className="cursor-pointer text-muted hover:text-ink">
          <X className="size-4" />
        </DialogPrimitive.Close>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
      {footer ? (
        <div className="flex justify-end gap-2 border-t border-line px-4 py-3">
          {footer}
        </div>
      ) : null}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
