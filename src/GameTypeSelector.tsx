export type GameType = "501" | "301";

export function GameTypeSelector(props: 
  { 
    type: GameType, 
    onTypeChange: (type: GameType) => void, 
  }) {

    function onChange(e:  React.ChangeEvent<HTMLInputElement>) {
      props.onTypeChange(e.target.value as GameType);
    }

    return (
        <>
          <label>
            <input type="radio" name="gameType" value="501" checked={props.type == "501"} onChange={onChange}/>
            501
          </label>

          <label>
            <input type="radio" name="gameType" value="301" checked={props.type == "301"} onChange={onChange}/>
            301
          </label>
        </>
  )
}