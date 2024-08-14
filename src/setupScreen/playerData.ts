export type PlayerData = {
  id: string;
  name: string;
};

let playerId = 0;
export function createPlayerData(index: number): PlayerData {
  return { id: String(playerId++), name: `Player ${index + 1}` };
}
