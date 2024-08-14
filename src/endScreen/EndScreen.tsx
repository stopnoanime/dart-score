import { PlayerData } from "../playerData";

export function EndScreen(props: { 
  playersData: PlayerData[],
  onGameRestart: () => void 
}) {
  const rowAmount = Math.max(...props.playersData.map(p => p.turns.length));

  return (
    <>
      <h1 className="text-6xl">End Results</h1>
      <div className="card">
        <table className="scoreTable">
          <thead>
            <tr>
              <th rowSpan={2}>Round</th>
              {props.playersData.map(p => (
                <th colSpan={2} key={p.id}>{p.name}</th>
              ))}
            </tr>
            <tr>
              {props.playersData.map(p => (<>
                <th key={p.id+"0"}>Throw</th>
                <th key={p.id+"1"}>Score</th>
              </>
              ))}
            </tr>
          </thead>
          <tbody>
              {[...Array(rowAmount)].map((_, i) =>(
                <tr key={i} className="odd:bg-neutral-600">
                  <td>{i}</td>
                    {props.playersData.map(p => (<>
                      <td key={p.id+"0"} className={(i<p.turns.length && !p.turns[i].isValid) ? "text-red-500": ""}>{i<p.turns.length? p.turns[i].throw : "-"}</td>
                      <td key={p.id+"1"}>{i<p.turns.length? p.turns[i].score : "-"}</td>
                    </>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <button className="button" onClick={props.onGameRestart}>
        Go Back
      </button>
    </>
    
  );
}
