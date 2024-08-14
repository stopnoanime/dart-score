import { useState } from "react";
import { PlayerData } from "./setupScreen/playerData";
import { GameType } from "./setupScreen/GameTypeSelector";
import { GameScreen } from "./gameScreen/GameScreen";
import { SetupScreen } from "./setupScreen/SetupScreen";
import { EndScreen } from "./endScreen/EndScreen";

type GameState = "setup" | "game" | "end";

export default function App() {
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const [gameType, setGameType] = useState<GameType>("501");
  const [gameState, setGameState] = useState<GameState>("setup");

  return (
    <>
      {gameState === "setup" && (
        <SetupScreen
          playersData={playersData}
          onPlayersDataChange={setPlayersData}
          gameType={gameType}
          onGameTypeChange={setGameType}
          onGameStart={() => setGameState("game")}
        />
      )}

      {gameState === "game" && (
        <GameScreen
          playersData={playersData}
          gameType={gameType}
          onGameEnd={() => setGameState("end")}
        />
      )}

      {gameState === "end" && (
        <EndScreen onGameRestart={() => setGameState("setup")} />
      )}
    </>
  );
}
