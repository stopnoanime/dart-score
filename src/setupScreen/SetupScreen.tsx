import { GameType, GameTypeSelector } from "./GameTypeSelector";
import { PlayerData } from "../playerData";
import { PlayersEntryTable } from "./PlayersEntryTable";

export function SetupScreen(props: {
  playersData: PlayerData[];
  onPlayersDataChange: (d: PlayerData[]) => void;
  gameType: GameType;
  onGameTypeChange: (d: GameType) => void;
  onGameStart: () => void;
}) {
  return (
    <>
      <h1 className="text-6xl text-center">Dart Score Keeper</h1>

      <PlayersEntryTable
        playersData={props.playersData}
        onPlayersDataChange={props.onPlayersDataChange}
      />

      <div className="card flex gap-8 items-center">
        <GameTypeSelector
          gameType={props.gameType}
          onGameTypeChange={props.onGameTypeChange}
        ></GameTypeSelector>

        <button
          className="button"
          onClick={props.onGameStart}
          disabled={props.playersData.length === 0}
        >
          Start Game
        </button>
      </div>
    </>
  );
}
