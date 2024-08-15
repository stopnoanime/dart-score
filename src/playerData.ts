export type PlayerData = {
  id: string;
  name: string;
  score: number;
  wonAtRound: number;
  turns: PlayerTurnData;
};

export type PlayerTurnData = {
  score: number;
  throw: number;
  isValid: boolean;
}[];

export function createPlayerData(index: number): PlayerData {
  return {
    id: crypto.randomUUID(),
    name: `Player ${index + 1}`,
    score: -1,
    wonAtRound: -1,
    turns: [],
  };
}
