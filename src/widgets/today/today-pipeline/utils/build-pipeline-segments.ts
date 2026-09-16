import type { BadgeTone } from "@/shared/constants/company";
import type { Company, CompanyStatus } from "@/shared/types/entities";

export type PipelineSegment = {
  key: string;
  label: string;
  count: number;
  share: number;
  tone: BadgeTone;
  statuses: CompanyStatus[];
};

const GROUPS: Omit<PipelineSegment, "count" | "share">[] = [
  { key: "queued", label: "В очереди", tone: "neutral", statuses: ["queued"] },
  { key: "active", label: "В работе", tone: "accent", statuses: ["active"] },
  { key: "waiting", label: "Ждём ответа", tone: "warn", statuses: ["waiting"] },
  {
    key: "responded",
    label: "Ответили",
    tone: "ok",
    statuses: ["responded", "interviewing", "offer"],
  },
  {
    key: "closed",
    label: "Закрыты",
    tone: "outline",
    statuses: ["rejected", "dormant", "excluded"],
  },
];

export const buildPipelineSegments = (params: { companies: Company[] }) => {
  const active = params.companies.filter(
    (company) => company.archivedAt === null,
  );

  const counted = GROUPS.map((group) => ({
    ...group,
    count: active.filter((company) => group.statuses.includes(company.status))
      .length,
  }));

  const total = counted.reduce((sum, group) => sum + group.count, 0);

  const segments: PipelineSegment[] = counted.map((group) => ({
    ...group,
    share: total === 0 ? 0 : group.count / total,
  }));

  return { segments, total };
};
