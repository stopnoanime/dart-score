export type PlayerData = {
    id: number,
    name: string,
    turns: PlayerTurnData,
    wonAtTurn: number
}
  
export type PlayerTurnData = {
    score: number,
    turnScore: number
    turnValid: boolean,
}[]

let playerId = 0;
export function createPlayer(index: number) : PlayerData {
    return {id: playerId++, name: `Player ${index + 1}`, turns: [], wonAtTurn: -1}
}