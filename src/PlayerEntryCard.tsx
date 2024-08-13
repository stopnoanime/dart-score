import { PlayerData } from "./player";

export function PlayerEntryCard(props: 
  { 
    player: PlayerData, 
    onPlayerDelete: (id: number) => void, 
    onPlayerEdit: (id: number, newName: string) => void, 
  }) {

    return (
        <div>
            <input type="text" value={props.player.name} onChange={(e) => props.onPlayerEdit(props.player.id, e.target.value)}/>
            <button onClick={() => props.onPlayerDelete(props.player.id)}>Delete</button>
        </div>
  )
}