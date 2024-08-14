import { createPlayerData, PlayerData } from './playerData'
import { PlayerEntryCard } from './PlayerEntryCard'

export function PlayersEntryTable(props: 
  { 
    playersData: PlayerData[],
    onPlayersDataChange: (d: PlayerData[]) => void,
  }) {

  function handlePlayerAdd() {
    props.onPlayersDataChange([...props.playersData, createPlayerData(props.playersData.length)])
  }

  function handlePlayerDelete(id: string) {
    props.onPlayersDataChange(props.playersData.filter(p => p.id !== id))
  }

  function handlePlayerEdit(id: string, newName: string) {
    props.onPlayersDataChange(props.playersData.map(p => p.id === id ? {...p, name: newName} : p))
  }

  return (
    <div>
      <ol>
        {
          props.playersData.map(p => 
            <li key={p.id}>
              <PlayerEntryCard 
                player={p} 
                onPlayerDelete={handlePlayerDelete} 
                onPlayerEdit={handlePlayerEdit}
              />
            </li>
          )
        }
      </ol>
      <button onClick={handlePlayerAdd}>Add Player</button>
    </div>
  )
}
