import { useRef, useState } from "react";
import { PlayerData } from "./player";

export function GameScreen(props: 
  { 
    playersData: PlayerData[], 
    onTurnEnd: (playerId: number, score: number) => void
  }) {
    const [playerIndex, setPlayerIndex] = useState(0);
    const [scores, setScores] = useState(["0","0","0"]);
    const focusInputRef = useRef<HTMLInputElement>(null);

    const player = props.playersData[playerIndex];
    const playerLastScore = player.turns[player.turns.length - 1].score;

    function endTurn() {
      props.onTurnEnd(player.id, scores.reduce((a,b) => Number(a) + Number(b),0))
      setPlayerIndex((playerIndex + 1) % props.playersData.length)
      setScores(["0","0","0"])
      focusInputRef.current!.focus();
    }
    
    function updateInputValue(index : number, value: string) {
      if(!/^\d*$/.test(value))
        value = "0";

      setScores(scores.map((v,i) => i === index ? value : v))
    }

    return (
      <>
        {player.name}<br/>
        score : {playerLastScore}<br/>
        {scores.map((v, i) => <input type="number" autoFocus={i==0} ref={i==0 ? focusInputRef : null} onFocus={e => e.target.select()} value={v} onChange={(e) => updateInputValue(i, e.target.value)}/>)}
        <button onClick={endTurn}>End turn</button>
      </>
  )
}