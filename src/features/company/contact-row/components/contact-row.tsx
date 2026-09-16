import { ExternalLink, Trash2 } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
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
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-2 last:border-b-0">
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-ink">{contact.name}</span>
          <Badge tone="outline">{CONTACT_ROLE_LABELS[contact.role]}</Badge>
          <Badge tone={CONTACT_STATUS_TONES[contact.status]}>
            {CONTACT_STATUS_LABELS[contact.status]}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          {contact.title ? <span>{contact.title}</span> : null}
          <span>{CONTACT_LANGUAGE_LABELS[contact.language]}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {contact.linkedinUrl ? (
          <a
            href={contact.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted hover:text-ink"
          >
            <ExternalLink className="size-4" />
          </a>
        ) : null}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemoveClick}
          icon={<Trash2 />}
          aria-label="Удалить контакт"
        />
      </div>
    </div>
  );
};
