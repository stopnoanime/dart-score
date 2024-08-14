import { useState } from "react";
import { GamePlayerData } from "./GameScreen";

export function GamePlayerCard(props: {
    player: GamePlayerData,
    onTurnEnd: (score: number) => void
}) {
    const [scores, setScores] = useState(["0","0","0"]);
    
    function handleInputChange(index : number, value: string) {
        if(!/^\d*$/.test(value))
          value = "0";
  
        setScores(scores.map((v,i) => i === index ? value : v))
    }

    return (
        <>
          {props.player.name}<br/>
          score : {props.player.score}<br/>
          {scores.map((v, i) => 
                <input type="number" key={i} autoFocus={i==0} onFocus={e => e.target.select()} 
                value={v} onChange={(e) => handleInputChange(i, e.target.value)}/>
            )}
          <button onClick={() => props.onTurnEnd(scores.reduce((a,b) => +a+(+b), 0))}>End turn</button>
        </>
    )
}