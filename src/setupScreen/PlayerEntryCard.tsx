import { PlayerData } from "./playerData";

export function PlayerEntryCard(props: {
  player: PlayerData;
  onPlayerDelete: (id: string) => void;
  onPlayerEdit: (id: string, newName: string) => void;
}) {
  return (
    <div>
      <input
        type="text"
        autoFocus
        value={props.player.name}
        onChange={(e) => props.onPlayerEdit(props.player.id, e.target.value)}
      />
      <button onClick={() => props.onPlayerDelete(props.player.id)}>
        Delete
      </button>
    </div>
  );
}
