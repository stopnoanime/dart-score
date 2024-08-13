import { useState } from 'react'
import { PlayersEntryTable } from "./PlayersEntryTable";
import { GameType, GameTypeSelector } from './GameTypeSelector';
import { createPlayer, PlayerData } from './player';
import { GameScreen } from './GameScreen';

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
    setPlayersData(playersData.map(p => p.id === id ? {...p, name: newName} : p))
  }

  function startGame() {
    setPlayersData(playersData.map(p => ({...p, turns: [{score: Number(gameType), turnScore: -1, turnValid: true}]})));
    setGameState("game")
  }

  function turnEnd(playerId: number, turnScore: number) {
    setPlayersData(playersData.map(p => {
      if(p.id !== playerId)
        return p;

      const lastScore = p.turns[p.turns.length - 1].score;
      const turnValid = turnScore <= lastScore;
      const newScore = turnValid ? (lastScore - turnScore) : lastScore;

      return {...p, turns: [...p.turns, {score: newScore, turnScore: turnScore, turnValid: turnValid }]}
    }))
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

      {gameState === "game" && 
        <>
          <GameScreen playersData={playersData} onTurnEnd={turnEnd}/>
        </>
      }
    </>
  )
}

export default App
