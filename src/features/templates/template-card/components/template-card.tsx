import { Copy, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  TEMPLATE_AUDIENCE_LABELS,
  TEMPLATE_LANG_LABELS,
  TEMPLATE_SCENARIO_LABELS,
} from "@/shared/constants/templates";
import type { Template } from "@/shared/types/entities";

export type TemplateCardProps = {
  template: Template;
  preview: string;
  onCopy: (params: { text: string }) => void;
  onEdit: (params: { id: string }) => void;
  onRemove: (params: { id: string }) => void;
};

export const TemplateCard = ({
  template,
  preview,
  onCopy,
  onEdit,
  onRemove,
}: TemplateCardProps) => {
  const handleCopyClick = () => {
    onCopy({ text: preview });
  };

  const handleEditClick = () => {
    onEdit({ id: template.id });
  };

  const handleRemoveClick = () => {
    onRemove({ id: template.id });
  };

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-line bg-surface px-4 py-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-semibold text-ink">{template.title}</h3>
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">{TEMPLATE_LANG_LABELS[template.lang]}</Badge>
            <Badge tone="outline">
              {TEMPLATE_AUDIENCE_LABELS[template.audience]}
            </Badge>
            <Badge tone="outline">
              {TEMPLATE_SCENARIO_LABELS[template.scenario]}
            </Badge>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEditClick}
            icon={<Pencil />}
            aria-label="Редактировать"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemoveClick}
            icon={<Trash2 />}
            aria-label="Удалить"
          />
        </div>
      </div>
      <p className="text-sm whitespace-pre-wrap text-muted">{preview}</p>
      <div>
        <Button size="sm" icon={<Copy />} onClick={handleCopyClick}>
          Скопировать
        </Button>
      </div>
    </article>
  );
};
