import PositionGame from "@/components/missions/position/PositionGame";
import PositionBackground from "@/components/missions/position/PositionBackground";
import type { MissionGameId } from "@/lib/missions/mission-registry";

type MissionRendererProps = {
  game: MissionGameId;
  section: "background" | "game";
};

export default function MissionRenderer({ game, section }: MissionRendererProps) {
  switch (game) {
    case "position":
      return section === "background" ? <PositionBackground /> : <PositionGame />;
    default: {
      const exhaustive: never = game;
      return exhaustive;
    }
  }
}
