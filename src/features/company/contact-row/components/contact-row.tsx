import { ExternalLink, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { StatusDot } from "@/shared/components/ui/status-dot";
import { buttonVariants } from "@/shared/constants/button-variants";
import {
  CONTACT_LANGUAGE_LABELS,
  CONTACT_ROLE_LABELS,
  CONTACT_STATUS_LABELS,
  CONTACT_STATUS_TONES,
} from "@/shared/constants/contacts";
import type { Contact } from "@/shared/types/entities";

export type ContactRowProps = {
  contact: Contact;
  onRemove: (params: { id: string }) => void;
};

export const ContactRow = ({ contact, onRemove }: ContactRowProps) => {
  const handleRemoveClick = () => {
    onRemove({ id: contact.id });
  };

  return (
    <div className="flex items-start justify-between gap-3 border-b border-line py-2.5 last:border-b-0">
      <div className="flex min-w-0 items-start gap-2.5">
        <StatusDot
          tone={CONTACT_STATUS_TONES[contact.status]}
          className="mt-2"
        />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[14px] leading-5 font-medium text-ink">
            {contact.name}
          </span>
          <span className="font-mono text-[11.5px] text-muted">
            {CONTACT_ROLE_LABELS[contact.role]} ·{" "}
            {CONTACT_STATUS_LABELS[contact.status]} ·{" "}
            {CONTACT_LANGUAGE_LABELS[contact.language]}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-0.5">
        {contact.linkedinUrl ? (
          <a
            href={contact.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Открыть LinkedIn"
            className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
          >
            <ExternalLink className="size-3.5" />
          </a>
        ) : null}
        <Button
          variant="danger-ghost"
          size="icon-sm"
          onClick={handleRemoveClick}
          icon={<Trash2 />}
          aria-label="Удалить контакт"
        />
      </div>
    </div>
  );
};
