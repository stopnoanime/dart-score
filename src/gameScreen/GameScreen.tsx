import { useState } from "react";
import { PlayerData } from "../setupScreen/playerData";
import { GameType } from "../setupScreen/GameTypeSelector";
import { GamePlayerCard } from "./GamePlayerCard";

export type GamePlayerData = PlayerData & {
  score: number,
  wonAtRound: number,
}

export type GameTurnData = {
  score: number,
  isValid: boolean,
}[]

export function GameScreen(props: 
  { 
    playersData: PlayerData[],
    gameType: GameType,
  }) {
    const [gamePlayersData, setGamePlayersData] = useState<GamePlayerData[]>(props.playersData.map(p => ({...p, score: +props.gameType, wonAtRound: -1})));
    const [gameTurnsData, setGameTurnsData] = useState<GameTurnData[]>([]);
    const [currentRound, setCurrentRound] = useState(0);
    const [playerIndex, setPlayerIndex] = useState(0);

    const player = gamePlayersData[playerIndex];

    function handleTurnEnd(turnScore: number) {
      const turnValid = turnScore <= player.score;
      const newScore = player.score - (turnValid ? turnScore : 0);
      const newWonAtRound = (newScore === 0) ? currentRound : -1;

      setGamePlayersData(gamePlayersData.map(p => p.id === player.id ? {...p, score: newScore, wonAtRound: newWonAtRound} : p))
      setGameTurnsData(gameTurnsData.map((t, i) => i === currentRound ? [...t, {score: turnScore, isValid: turnValid}] : t))
      
      if(playerIndex === gamePlayersData.length - 1) setCurrentRound(currentRound + 1)
      setPlayerIndex((playerIndex + 1) % gamePlayersData.length)
    }

    return (
      <>
      Round: {currentRound}<br/>
      <GamePlayerCard key={currentRound + player.id} player={player} onTurnEnd={handleTurnEnd}/>
      </>
      
    )
}