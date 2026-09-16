import type { Company, CompanyStatus } from "@/shared/types/entities";

export type PipelineSegment = {
  key: string;
  label: string;
  count: number;
  statuses: CompanyStatus[];
};

const GROUPS: Omit<PipelineSegment, "count">[] = [
  { key: "queued", label: "В очереди", statuses: ["queued"] },
  { key: "active", label: "В работе", statuses: ["active"] },
  { key: "waiting", label: "Ждём ответа", statuses: ["waiting"] },
  {
    key: "responded",
    label: "Ответили",
    statuses: ["responded", "interviewing", "offer"],
  },
  {
    key: "closed",
    label: "Закрыты",
    statuses: ["rejected", "dormant", "excluded"],
  },
];

/** Счётчики по стадиям воронки. Архив в них не попадает. */
export const buildPipelineSegments = (params: { companies: Company[] }) => {
  const active = params.companies.filter(
    (company) => company.archivedAt === null,
  );

  const segments: PipelineSegment[] = GROUPS.map((group) => ({
    ...group,
    count: active.filter((company) => group.statuses.includes(company.status))
      .length,
  }));

  return { segments, total: active.length };
};
