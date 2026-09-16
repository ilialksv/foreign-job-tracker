import { PageHeader } from "@/shared/components/common/page-header";
import { RunSession } from "@/widgets/run/run-session/components/run-session";

export const RunPage = () => (
  <div className="flex flex-col gap-5">
    <PageHeader
      title="Режим выполнения"
      description="Делай то, что на экране, отмечай результат — следующий шаг подставится сам."
    />
    <RunSession />
  </div>
);
