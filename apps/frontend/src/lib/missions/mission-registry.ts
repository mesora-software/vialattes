export type MissionGameId = "position";

export type MissionDefinition = {
  moduleId: string;
  missionId: string;
  title: string;
  description: string;
  game: MissionGameId;
  requiresLandscape: boolean;
};

const missions: Record<string, MissionDefinition> = {
  "module01-cinematica/mission01-posicao": {
    moduleId: "module01-cinematica",
    missionId: "mission01-posicao",
    title: "Cinemática • Posição",
    description: "Determine a posição de cada Zip e acerte o disparo.",
    game: "position",
    requiresLandscape: true,
  },
};

export function getMission(
  moduleId: string,
  missionId: string,
): MissionDefinition | undefined {
  return missions[`${moduleId}/${missionId}`];
}
