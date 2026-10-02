export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;

  return (
    <>
      <h1>Módulo</h1>
      <p>Módulo selecionado: {moduleId}</p>
    </>
  );
}