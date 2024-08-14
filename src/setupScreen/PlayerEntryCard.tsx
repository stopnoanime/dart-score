import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlayerData } from "./playerData";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function PlayerEntryCard(props: {
  player: PlayerData;
  onPlayerDelete: (id: string) => void;
  onPlayerEdit: (id: string, newName: string) => void;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Player's name"
        autoFocus
        onFocus={(e) => e.target.select()}
        value={props.player.name}
        onChange={(e) => props.onPlayerEdit(props.player.id, e.target.value)}
      />
      <button
        className="rounded-full bg-red-500 w-5 h-5 top-0 right-0 absolute translate-x-1/2 -translate-y-1/2 grid place-items-center"
        title="delete player"
        onClick={() => props.onPlayerDelete(props.player.id)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
