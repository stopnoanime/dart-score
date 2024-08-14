import { useState } from "react";
import { PlayerData } from "../playerData";

export function GamePlayerCard(props: {
  player: PlayerData;
  onTurnEnd: (score: number) => void;
}) {
  const [scores, setScores] = useState(["0", "0", "0"]);

  function handleInputChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) value = "0";

    setScores(scores.map((v, i) => (i === index ? value : v)));
  }

  return (
    <div className="card flex flex-col gap-8 items-center">
      <span className="text-4xl playerName">{props.player.name}</span>
      <span className="-mt-5">Score: {props.player.score}</span>

      <div className="flex gap-4">
        {scores.map((v, i) => (
          <div key={i}>
            <input
              className="!w-16 styled-input"
              type="number"
              autoFocus={i == 0}
              onFocus={(e) => e.target.select()}
              value={v}
              onChange={(e) => handleInputChange(i, e.target.value)}
            />
            <div className="text-xs text-center mt-1 font-thin">
              Throw {i + 1}
            </div>
          </div>
        ))}
      </div>

      <button
        className="button"
        onClick={() => props.onTurnEnd(scores.reduce((a, b) => +a + +b, 0))}
      >
        End turn
      </button>
    </div>
  );
}
