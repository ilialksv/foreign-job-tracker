import { Copy, Pencil, Trash2 } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  TEMPLATE_AUDIENCE_LABELS,
  TEMPLATE_LANG_LABELS,
  TEMPLATE_LANG_ORDER,
  TEMPLATE_SCENARIO_LABELS,
} from "@/shared/constants/templates";
import type { Template, TemplateLang } from "@/shared/types/entities";
import { cn } from "@/shared/utils/cn";

export type TemplateCardProps = {
  template: Template;
  lang: TemplateLang;
  preview: string;
  onLangChange: (params: { id: string; lang: TemplateLang }) => void;
  onCopy: (params: { text: string }) => void;
  onEdit: (params: { id: string }) => void;
  onRemove: (params: { id: string }) => void;
};

export const TemplateCard = ({
  template,
  lang,
  preview,
  onLangChange,
  onCopy,
  onEdit,
  onRemove,
}: TemplateCardProps) => {
  const handleCopyClick = useCallback(() => {
    onCopy({ text: preview });
  }, [onCopy, preview]);

  const handleEditClick = useCallback(() => {
    onEdit({ id: template.id });
  }, [onEdit, template.id]);

  const handleRemoveClick = useCallback(() => {
    onRemove({ id: template.id });
  }, [onRemove, template.id]);

  const handleEnClick = useCallback(() => {
    onLangChange({ id: template.id, lang: "en" });
  }, [onLangChange, template.id]);

  const handleRuClick = useCallback(() => {
    onLangChange({ id: template.id, lang: "ru" });
  }, [onLangChange, template.id]);

  const langHandlers: Record<TemplateLang, () => void> = {
    en: handleEnClick,
    ru: handleRuClick,
  };

  return (
    <Card className="group flex flex-col gap-3 px-4 py-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="font-display text-[14.5px] leading-5 font-semibold text-ink">
            {template.title}
          </h3>
          <span className="font-mono text-[11px] text-muted">
            {TEMPLATE_SCENARIO_LABELS[template.scenario]} ·{" "}
            {TEMPLATE_AUDIENCE_LABELS[template.audience]}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <div className="mr-1 inline-flex gap-0.5 rounded-md bg-surface-2 p-0.5">
            {TEMPLATE_LANG_ORDER.map((currentLang) => (
              <button
                key={currentLang}
                type="button"
                onClick={langHandlers[currentLang]}
                disabled={template.bodies[currentLang].length === 0}
                className={cn(
                  "inline-flex h-7 items-center rounded-sm px-2 font-mono text-[11px] transition-colors disabled:opacity-40",
                  {
                    "bg-raised text-ink": currentLang === lang,
                    "text-muted hover:text-ink": currentLang !== lang,
                  },
                )}
              >
                {TEMPLATE_LANG_LABELS[currentLang]}
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleEditClick}
            icon={<Pencil />}
            aria-label="Редактировать шаблон"
          />
          <Button
            variant="danger-ghost"
            size="icon-sm"
            onClick={handleRemoveClick}
            icon={<Trash2 />}
            aria-label="Удалить шаблон"
          />
        </div>
      </div>

      <p className="rounded-(--radius-control) bg-surface-2 px-3 py-2.5 font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-ink-2">
        {preview.length > 0 ? preview : "На этом языке текста пока нет."}
      </p>

      <div>
        <Button
          size="sm"
          variant="ghost"
          icon={<Copy />}
          disabled={preview.length === 0}
          onClick={handleCopyClick}
        >
          Скопировать
        </Button>
      </div>
    </Card>
  );
};
