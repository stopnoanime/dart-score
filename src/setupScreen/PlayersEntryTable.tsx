import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPlayerData, PlayerData } from "../playerData";
import { PlayerEntryCard } from "./PlayerEntryCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function PlayersEntryTable(props: {
  playersData: PlayerData[];
  onPlayersDataChange: (d: PlayerData[]) => void;
}) {
  function handlePlayerAdd() {
    props.onPlayersDataChange([
      ...props.playersData,
      createPlayerData(props.playersData.length),
    ]);
  }

  function handlePlayerDelete(id: string) {
    props.onPlayersDataChange(props.playersData.filter((p) => p.id !== id));
  }

  function handlePlayerEdit(id: string, newName: string) {
    props.onPlayersDataChange(
      props.playersData.map((p) => (p.id === id ? { ...p, name: newName } : p)),
    );
  }

  return (
    <div className="card">
      <ol className="flex gap-6 flex-wrap items-center justify-center px-2">
        {props.playersData.map((p) => (
          <li key={p.id}>
            <PlayerEntryCard
              player={p}
              onPlayerDelete={handlePlayerDelete}
              onPlayerEdit={handlePlayerEdit}
            />
          </li>
        ))}
        <li>
          <button onClick={handlePlayerAdd} title="Add player">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </li>
      </ol>
    </div>
  );
}
