export default async function MissionPage({
  params,
}: {
  params: Promise<{
    moduleId: string;
    missionId: string;
  }>;
}) {
  const { moduleId, missionId } = await params;

  return (
    <>
      <h1>Missão</h1>
      <p>Módulo: {moduleId}</p>
      <p>Missão: {missionId}</p>
    </>
  );
}