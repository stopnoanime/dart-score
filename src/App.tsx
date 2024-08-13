import { useState } from 'react'
import { PlayersEntryTable } from "./PlayersEntryTable";
import { GameType, GameTypeSelector } from './GameTypeSelector';
import { createPlayer, PlayerData } from './player';

type GameState = "setup" | "game" | "end";

function App() {
  const [playersData, setPlayersData] = useState<PlayerData[]>([createPlayer(0)])
  const [gameType, setGameType] = useState<GameType>("501")
  const [gameState, setGameState] = useState<GameState>("setup")

  function playerAdd() {
    setPlayersData([...playersData, createPlayer(playersData.length)])
  }

  function playerDelete(id: number) {
    setPlayersData(playersData.filter(p => p.id != id))
  }

  function playerEdit(id: number, newName: string) {
    setPlayersData(playersData.map(p => p.id == id ? {...p, name: newName} : p))
  }

  function startGame() {
    setPlayersData(playersData.map(p => ({...p, turns: [{score: Number(gameType), turnScore: -1, turnValid: true}]})));
    setGameState("game")
  }

  return (
    <>
      {gameState === "setup" && 
        <>
          <PlayersEntryTable playersData={playersData} onPlayerAdd={playerAdd} onPlayerDelete={playerDelete} onPlayerEdit={playerEdit}/>
          <GameTypeSelector type={gameType} onTypeChange={type => setGameType(type)}></GameTypeSelector>
          <button onClick={startGame}>Start</button>
        </>
      }
    </>
  )
}

export default App
