import { PlayerData } from "../playerData";
import { ScoreBoard } from "./Scoreboard";

export function EndScreen(props: { 
  playersData: PlayerData[],
  onGameRestart: () => void 
}) {
  return (
    <>
      <h1 className="text-6xl">End Results</h1>

      <ScoreBoard playersData={props.playersData}/>
      
      <button className="button" onClick={props.onGameRestart}>
        Go Back
      </button>
    </>
    
  );
}
