import type { BadgeTone } from "@/shared/constants/company";
import type { TaskStatus } from "@/shared/types/entities";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "К выполнению",
  in_progress: "В процессе",
  done: "Сделано",
  skipped: "Пропущено",
};

export const TASK_STATUS_TONES: Record<TaskStatus, BadgeTone> = {
  todo: "outline",
  in_progress: "accent",
  done: "ok",
  skipped: "neutral",
};
