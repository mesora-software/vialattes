import { notFound } from "next/navigation";
import MissionLayout from "@/components/missions/MissionLayout";
import { getMission } from "@/lib/missions/mission-registry";

type MissionPageProps = {
  params: Promise<{
    moduleId: string;
    missionId: string;
  }>;
};

export default async function MissionPage({ params }: MissionPageProps) {
  const { moduleId, missionId } = await params;
  const mission = getMission(moduleId, missionId);

  if (!mission) notFound();

  return <MissionLayout mission={mission} />;
}
