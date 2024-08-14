export function EndScreen(props: { onGameRestart: () => void }) {
  return (
    <>
      This is the end{" "}
      <button className="button" onClick={props.onGameRestart}>
        Go Back
      </button>
    </>
  );
}
