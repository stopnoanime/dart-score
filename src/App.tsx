import { useState } from "react";
import { createPlayerData, PlayerData } from "./playerData";
import { GameType } from "./setupScreen/GameTypeSelector";
import { GameScreen } from "./gameScreen/GameScreen";
import { SetupScreen } from "./setupScreen/SetupScreen";
import { EndScreen } from "./endScreen/EndScreen";

type GameState = "setup" | "game" | "end";

export default function App() {
  const [playersData, setPlayersData] = useState<PlayerData[]>([
    createPlayerData(0),
  ]);
  const [gameType, setGameType] = useState<GameType>("501");
  const [gameState, setGameState] = useState<GameState>("setup");

  function handleGameStart() {
    setPlayersData(d => d.map(p => ({...p, score: +gameType, wonAtRound: -1, turns: []})))
    setGameState("game")
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
          gameType={gameType}
          onGameEnd={() => setGameState("end")}
        />
      )}

      {gameState === "end" && (
        <EndScreen playersData={playersData} onGameRestart={() => setGameState("setup")} />
      )}
    </>
  );
}
