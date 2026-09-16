import { Copy, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
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
    <Card className="group flex flex-col gap-3 px-4 py-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3 className="font-display text-[14.5px] leading-5 font-semibold text-ink">
            {template.title}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge tone="accent">{TEMPLATE_LANG_LABELS[template.lang]}</Badge>
            <span className="font-mono text-[11px] text-muted">
              {TEMPLATE_SCENARIO_LABELS[template.scenario]} ·{" "}
              {TEMPLATE_AUDIENCE_LABELS[template.audience]}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleEditClick}
            icon={<Pencil />}
            aria-label="Редактировать шаблон"
          />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleRemoveClick}
            icon={<Trash2 />}
            aria-label="Удалить шаблон"
          />
        </div>
      </div>

      <p className="rounded-(--radius-control) bg-surface-2 px-3 py-2.5 font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-ink-2">
        {preview}
      </p>

      <div>
        <Button
          size="sm"
          variant="ghost"
          icon={<Copy />}
          onClick={handleCopyClick}
        >
          Скопировать
        </Button>
      </div>
    </Card>
  );
};
