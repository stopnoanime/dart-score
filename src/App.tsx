import { useState } from "react";
import { createPlayerData, PlayerData } from "./playerData";
import { GameType } from "./setupScreen/GameTypeSelector";
import { GameScreen } from "./gameScreen/GameScreen";
import { SetupScreen } from "./setupScreen/SetupScreen";
import { EndScreen } from "./endScreen/EndScreen";
import { getKey, useSyncKey } from "./localStorage";

export type GameState = "setup" | "game" | "end";

export default function App() {
  const [playersData, setPlayersData] = useState<PlayerData[]>(
    getKey("playersData", [createPlayerData(1)]),
  );
  const [gameState, setGameState] = useState<GameState>(
    getKey("gameState", "setup"),
  );
  const [gameType, setGameType] = useState<GameType>(getKey("gameType", "501"));

  useSyncKey("playersData", playersData);
  useSyncKey("gameState", gameState);
  useSyncKey("gameType", gameType);

  function handleGameStart() {
    setPlayersData((d) =>
      d.map((p) => ({
        ...p,
        won: false,
        turns: [{ score: +gameType, isValid: true, throw: "-" }],
      })),
    );
    setGameState("game");
  }

  return (
    <>
      {gameState === "setup" && (
        <SetupScreen
          playersData={playersData}
          onPlayersDataChange={setPlayersData}
          gameType={gameType}
          onGameTypeChange={setGameType}
          onGameStart={handleGameStart}
        />
      )}

      {gameState === "game" && (
        <GameScreen
          playersData={playersData}
          onPlayersDataChange={setPlayersData}
          onGameEnd={() => setGameState("end")}
        />
      )}

      {gameState === "end" && (
        <EndScreen
          playersData={playersData}
          onGameRestart={() => setGameState("setup")}
        />
      )}
    </>
  );
}
