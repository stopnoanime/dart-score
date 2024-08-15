export type PlayerData = {
  id: string;
  name: string;
  won: boolean;
  turns: PlayerTurnData;
};

export type PlayerTurnData = {
  score: number;
  throw: string;
  isValid: boolean;
}[];

export function createPlayerData(number: number): PlayerData {
  return {
    id: crypto.randomUUID(),
    name: `Player ${number}`,
    won: false,
    turns: [],
  };
}
