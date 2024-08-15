import { Dispatch, SetStateAction, useState } from "react";
import { PlayerData } from "../playerData";
import { GamePlayerCard } from "./GamePlayerCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteKey, getKey, syncKey } from "../localStorage";

export function GameScreen(props: {
  playersData: PlayerData[];
  onPlayersDataChange: Dispatch<SetStateAction<PlayerData[]>>;
  onGameEnd: () => void;
}) {
  const [currentRound, setCurrentRound] = useState(getKey("currentRound", 1));
  const [playerIndex, setPlayerIndex] = useState(getKey("playerIndex", 0));

  syncKey("currentRound", currentRound);
  syncKey("playerIndex", playerIndex);

  const [showPopup, setShowPopup] = useState(false);
  const [popupPlayer, setPopupPlayer] = useState<PlayerData>();

  const player = props.playersData[playerIndex];

  function handleTurnEnd(turnScore: number) {
    const turnValid = turnScore <= player.score;
    const newScore = player.score - (turnValid ? turnScore : 0);
    const hasWon = newScore === 0;
    const newWonAtRound = hasWon ? currentRound : -1;

    if (hasWon) {
      setPopupPlayer(player);
      setShowPopup(true);
    }

    props.onPlayersDataChange((d) =>
      d.map((p) =>
        p.id === player.id
          ? {
              ...p,
              score: newScore,
              wonAtRound: newWonAtRound,
              turns: [
                ...p.turns,
                { throw: turnScore, score: newScore, isValid: turnValid },
              ],
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
      handleGameEnd();
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

      <GamePlayerCard
        key={currentRound + player.id}
        player={player}
        onTurnEnd={handleTurnEnd}
      />

      {showPopup && (
        <div className="absolute top-0 left-0 right-0 bottom-0 grid place-items-center bg-opacity-40 bg-black p-4">
          <div className="card flex flex-col gap-4">
            <span className="text-xl playerName">
              {popupPlayer?.name} has won!
            </span>
            <button className="button" onClick={() => setShowPopup(false)}>
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
