import { PlayerData } from './player'
import { PlayerEntryCard } from './PlayerEntryCard'

export function PlayersEntryTable(props: 
  { 
    playersData: PlayerData[], 
    onPlayerAdd: () => void, 
    onPlayerDelete: (id: number) => void, 
    onPlayerEdit: (id: number, newName: string) => void, 
  }) {

    const playerCards = props.playersData.map(p => 
      <li key={p.id}>
        <PlayerEntryCard 
          player={p} 
          onPlayerDelete={props.onPlayerDelete} 
          onPlayerEdit={props.onPlayerEdit}
        />
      </li>
    )

  return (
    <div>
      <ol>
        {playerCards}
      </ol>
      <button onClick={props.onPlayerAdd}>Add Player</button>
    </div>
  )
}
