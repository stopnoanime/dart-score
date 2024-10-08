import { Dispatch, SetStateAction, useState } from "react";
import { PlayerData } from "../playerData";
import { GamePlayerCard } from "./GamePlayerCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteKey, getKey, useSyncKey } from "../localStorage";
import { ScoreBoard } from "../endScreen/Scoreboard";

export function GameScreen(props: {
  playersData: PlayerData[];
  onPlayersDataChange: Dispatch<SetStateAction<PlayerData[]>>;
  onGameEnd: () => void;
}) {
  const [currentRound, setCurrentRound] = useState(getKey("currentRound", 1));
  const [playerIndex, setPlayerIndex] = useState(getKey("playerIndex", 0));

  useSyncKey("currentRound", currentRound);
  useSyncKey("playerIndex", playerIndex);

  const [showPopup, setShowPopup] = useState(false);
  const [popupPlayer, setPopupPlayer] = useState<PlayerData>();

  const player = props.playersData[playerIndex];
  const playerScore = props.playersData[playerIndex].turns.at(-1)!.score;

  function handleTurnEnd(turnScore: number) {
    const turnValid = turnScore <= playerScore;
    const newScore = playerScore - (turnValid ? turnScore : 0);
    const hasWon = newScore === 0;

    if (hasWon) {
      setPopupPlayer(player);
      setShowPopup(true);
    }

    props.onPlayersDataChange((d) =>
      d.map((p) =>
        p.id === player.id
          ? {
              ...p,
              won: hasWon,
              turns: [
                ...p.turns,
                {
                  throw: String(turnScore),
                  score: newScore,
                  isValid: turnValid,
                },
              ],
            }
          : p,
      ),
    );

    const newIndex = skipWonPlayers(playerIndex + 1);
    if (newIndex === props.playersData.length)
      goToNextRound(hasWon ? playerIndex : -1);
    else setPlayerIndex(newIndex);
  }

  function goToNextRound(lastIndex: number) {
    setCurrentRound((r) => r + 1);

    const startIndex = skipWonPlayers(0);
    if (startIndex === props.playersData.length || startIndex === lastIndex)
      handleGameEnd();
    else setPlayerIndex(startIndex);
  }

  function skipWonPlayers(startIndex: number) {
    while (
      startIndex < props.playersData.length &&
      props.playersData[startIndex].won
    )
      startIndex++;

    return startIndex;
  }

  function handleGameEnd() {
    deleteKey("currentRound");
    deleteKey("playerIndex");
    props.onGameEnd();
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

      <button
        className="absolute right-6 top-4"
        title="End game"
        onClick={handleGameEnd}
      >
        <FontAwesomeIcon icon={faXmark} size="2xl" />
      </button>

      <div className="flex gap-8 flex-wrap justify-center max-w-full items-center mt-16">
        <GamePlayerCard
          key={currentRound + player.id}
          player={player}
          onTurnEnd={handleTurnEnd}
        />
        <ScoreBoard playersData={props.playersData} />
      </div>

      {showPopup && (
        <div className="absolute top-0 left-0 right-0 bottom-0 grid place-items-center bg-opacity-40 bg-black p-4">
          <div className="card flex flex-col gap-4">
            <span className="text-xl playerName">
              {popupPlayer?.name} has won!
            </span>
            <button
              autoFocus
              className="button"
              onClick={() => setShowPopup(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
