export type GameType = "501" | "301";

export function GameTypeSelector(props: {
  gameType: GameType;
  onGameTypeChange: (type: GameType) => void;
}) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onGameTypeChange(e.target.value as GameType);
  }

  return (
    <fieldset>
      <legend>Game Type:</legend>
      <label className="mr-4 inline-flex items-center gap-1">
        <input
          type="radio"
          name="gameType"
          value="501"
          checked={props.gameType == "501"}
          onChange={onChange}
        />
        501
      </label>

      <label className="inline-flex items-center gap-1">
        <input
          type="radio"
          name="gameType"
          value="301"
          checked={props.gameType == "301"}
          onChange={onChange}
        />
        301
      </label>
    </fieldset>
  );
}
