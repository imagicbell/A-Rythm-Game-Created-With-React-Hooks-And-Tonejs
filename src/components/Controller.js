import { useState } from "react";

const style = {
	display: "flex",
	justifyContent: "space-around"
}

export default function Controller({ onPlay, onStop, onPause, onResume, onUseLeft, onUseRight }) {
	const [isPlay, setPlay] = useState(false);
	const [isPause, setPause] = useState(false);
	const [useRight, setUseRight] = useState(true);
	const [useLeft, setUseLeft] = useState(true);

	const handleBtnClick = e => {
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

	const handleInputChange = e => {
		const inputName = e.target.name;
		switch (inputName) {
			case "rightHand":
				setUseRight(e.target.checked);
				onUseRight(e.target.checked);
				break;
			case "leftHand":
				setUseLeft(e.target.checked);
				onUseLeft(e.target.checked);
				break;
			default:
				break;
		}
	}

	return (
		<div style={style}>
			{
				!isPlay
				? <button name="play" onClick={handleBtnClick}>Play</button>
				: (!isPause
					 ? <button name="pause" onClick={handleBtnClick}>Pause</button> 
					 : (<>
								<button name="resume" onClick={handleBtnClick}>Resume</button>
								<button name="stop" onClick={handleBtnClick}>Stop</button>
							</>)
					)
			}
			<span>&emsp;Right hand</span>
			<input type="checkbox" name="rightHand" checked={useRight} onChange={handleInputChange} />
			<span>&emsp;Left hand</span>
			<input type="checkbox" name="leftHand" checked={useLeft} onChange={handleInputChange} />
		</div>
	)
}