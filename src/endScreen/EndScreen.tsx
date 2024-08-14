export function EndScreen(props: {
    onGameRestart: () => void
}) {
    return (
        <>This is the end <button onClick={props.onGameRestart}>Go back</button></>
    )
}