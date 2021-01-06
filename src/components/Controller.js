import { useState } from "react";

const style = {
	display: "flex",
	justifyContent: "space-around"
}

export default function Controller({ onPlay, onStop, onPause, onResume }) {
	const [isPlay, setPlay] = useState(false);
	const [isPause, setPause] = useState(false);

	const onClickButton = e => {
		const controlName = e.target.name;
		switch (controlName) {
			case "play":
				onPlay();
				setPlay(true);
				break;
			case "pause":
				onPause();
				setPause(true);
				break;
			case "resume":
				onResume();
				setPause(false);
				break;
			case "stop":
				onStop();
				setPlay(false);
				break;
			default:
				break;
		}
	}

	return (
		<div style={style}>
			{
				!isPlay
				? <button name="play" onClick={onClickButton}>Play</button>
				: (!isPause
					 ? <button name="pause" onClick={onClickButton}>Pause</button> 
					 : (<>
								<button name="resume" onClick={onClickButton}>Resume</button>
								<button name="stop" onClick={onClickButton}>Stop</button>
							</>)
					)
			}
		</div>
	)
}