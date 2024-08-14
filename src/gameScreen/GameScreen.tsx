import { useState } from "react";
import { PlayerData } from "../setupScreen/playerData";
import { GameType } from "../setupScreen/GameTypeSelector";
import { GamePlayerCard } from "./GamePlayerCard";

export type GamePlayerData = PlayerData & {
  score: number;
  wonAtRound: number;
  turns: PlayerTurnData;
};

export type PlayerTurnData = {
  score: number;
  isValid: boolean;
}[];

export function GameScreen(props: {
  playersData: PlayerData[];
  gameType: GameType;
  onGameEnd: () => void;
}) {
  const [gamePlayersData, setGamePlayersData] = useState<GamePlayerData[]>(
    props.playersData.map((p) => ({
      ...p,
      score: +props.gameType,
      wonAtRound: -1,
      turns: [],
    })),
  );

  const [currentRound, setCurrentRound] = useState(1);
  const [playerIndex, setPlayerIndex] = useState(0);

  const player = gamePlayersData[playerIndex];

  function handleTurnEnd(turnScore: number) {
    const turnValid = turnScore <= player.score;
    const newScore = player.score - (turnValid ? turnScore : 0);
    const hasWon = newScore === 0;
    const newWonAtRound = hasWon ? currentRound : -1;

    setGamePlayersData((d) =>
      d.map((p) =>
        p.id === player.id
          ? {
              ...p,
              score: newScore,
              wonAtRound: newWonAtRound,
              turns: [...p.turns, { score: turnScore, isValid: turnValid }],
            }
          : p,
      ),
    );

    const newIndex = skipFinishedPlayers(playerIndex + 1);
    if (newIndex === gamePlayersData.length)
      goToNextRound(hasWon ? playerIndex : -1);
    else setPlayerIndex(newIndex);
  }

  function goToNextRound(skipIndex: number) {
    setCurrentRound((r) => r + 1);

    const startIndex = skipFinishedPlayers(0);
    if (startIndex === gamePlayersData.length || startIndex === skipIndex)
      props.onGameEnd();
    else setPlayerIndex(startIndex);
  }

  function skipFinishedPlayers(startIndex: number) {
    while (
      startIndex < gamePlayersData.length &&
      gamePlayersData[startIndex].wonAtRound !== -1
    )
      startIndex++;

    return startIndex;
  }

  return (
    <>
      <div className="absolute left-4 top-4 text-xl">
        <table>
          <tr>
            <td className="pr-1">Round</td>
            <td className="text-center">{currentRound}</td>
          </tr>
          <tr>
            <td>Player</td>
            <td>
              {playerIndex + 1} / {gamePlayersData.length}
            </td>
          </tr>
        </table>
      </div>
      <GamePlayerCard
        key={currentRound + player.id}
        player={player}
        onTurnEnd={handleTurnEnd}
      />
    </>
  );
}
