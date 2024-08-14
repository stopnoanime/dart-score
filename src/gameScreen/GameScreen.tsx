import { Dispatch, SetStateAction, useState } from "react";
import { PlayerData } from "../playerData";
import { GameType } from "../setupScreen/GameTypeSelector";
import { GamePlayerCard } from "./GamePlayerCard";

export function GameScreen(props: {
  playersData: PlayerData[];
  onPlayersDataChange: Dispatch<SetStateAction<PlayerData[]>>;
  gameType: GameType;
  onGameEnd: () => void;
}) {
  const [currentRound, setCurrentRound] = useState(1);
  const [playerIndex, setPlayerIndex] = useState(0);

  const player = props.playersData[playerIndex];

  function handleTurnEnd(turnScore: number) {
    const turnValid = turnScore <= player.score;
    const newScore = player.score - (turnValid ? turnScore : 0);
    const hasWon = newScore === 0;
    const newWonAtRound = hasWon ? currentRound : -1;

    props.onPlayersDataChange((d) =>
      d.map((p) =>
        p.id === player.id
          ? {
              ...p,
              score: newScore,
              wonAtRound: newWonAtRound,
              turns: [...p.turns, { throw: turnScore, score: newScore, isValid: turnValid }],
            }
          : p,
      ),
    );

    const newIndex = skipFinishedPlayers(playerIndex + 1);
    if (newIndex === props.playersData.length)
      goToNextRound(hasWon ? playerIndex : -1);
    else setPlayerIndex(newIndex);
  }

  function goToNextRound(skipIndex: number) {
    setCurrentRound((r) => r + 1);

    const startIndex = skipFinishedPlayers(0);
    if (startIndex === props.playersData.length || startIndex === skipIndex)
      props.onGameEnd();
    else setPlayerIndex(startIndex);
  }

  function skipFinishedPlayers(startIndex: number) {
    while (
      startIndex < props.playersData.length &&
      props.playersData[startIndex].wonAtRound !== -1
    )
      startIndex++;

    return startIndex;
  }

  return (
    <>
      <div className="absolute left-4 top-4 text-xl">
        <table>
          <tbody>
            <tr>
              <td className="pr-1">Round</td>
              <td className="text-center">{currentRound}</td>
            </tr>
            <tr>
              <td>Player</td>
              <td>
                {playerIndex + 1} / {props.playersData.length}
              </td>
            </tr>
          </tbody>
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
