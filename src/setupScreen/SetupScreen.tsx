import { GameType, GameTypeSelector } from "./GameTypeSelector";
import { PlayerData } from "./playerData";
import { PlayersEntryTable } from "./PlayersEntryTable";

export function SetupScreen(props: {
  playersData: PlayerData[],
  onPlayersDataChange: (d: PlayerData[]) => void,
  gameType: GameType,
  onGameTypeChange: (d: GameType) => void,
  onGameStart: () => void
}) {
    
  return (
    <>
      <PlayersEntryTable playersData={props.playersData} onPlayersDataChange={props.onPlayersDataChange}/>
      <GameTypeSelector gameType={props.gameType} onGameTypeChange={props.onGameTypeChange}></GameTypeSelector>
      <button onClick={props.onGameStart} disabled={props.playersData.length === 0}>Start</button>
    </>
  )
}