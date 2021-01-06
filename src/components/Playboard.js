import { useRef, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import MusicPlayer from '../services/MusicPlayer';
import Track from './Track';
import Score from './Score';
import Canvas from './Canvas';
import { 
	PLAYBOARD_WIDTH, PLAYBOARD_HEIGHT, LIGHT_COLORS, KEY_MAP,
	SCORE_PERFECT, SCORE_GOOD, SCORE_MISS
 } from "../global/settings";

const wrapStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	padding: "10px"
}

const canvasStyle = {
	border: "1px solid #000000"
}

export default function Playboard() {
	const [scoreData, setScoreData] = useState({ combo: 0, result: "" });
	const trackList = useRef(null);
	const musicPlayer = useRef(null);
	
	//initialize
	useEffect(() => {
		const colors = LIGHT_COLORS[Math.floor(Math.random() * LIGHT_COLORS.length)];
		trackList.current = Array(colors.length).fill().map((_, index) => new Track(index, colors[index]));
		trackList.current.forEach(track => track.onClickResult = decideScore);

		musicPlayer.current = new MusicPlayer();
		musicPlayer.current.loadMusic("Fur_Elise");
		musicPlayer.current.onNotePreview = noteInfo => {
			trackList.current[noteInfo.lightId].addDrop(noteInfo.playType, noteInfo.duration);
		};
	}, []);

	useHotkeys(Object.keys(KEY_MAP).join(','), (event, handler) => {
		const lightId = KEY_MAP[handler.key];
		if (event.type === "keydown") {
			trackList.current[lightId].onPressLight();
		} else if (event.type === "keyup") {
			trackList.current[lightId].onReleaseLight();
		}
	}, { keydown: true, keyup: true });

	const draw = (ctx, deltaTime) => {
		trackList.current.forEach(track => track.draw(ctx, deltaTime));
	}

	const decideScore = result => {
		switch (result) {
			case SCORE_PERFECT:
			case SCORE_GOOD:
				setScoreData(prev => ({ combo: prev.combo + 1, result }));
				break;
			case SCORE_MISS:
				setScoreData({ combo: 0, result });
				break;
			default:
				break;
		}
	}

	return (
		<div style={wrapStyle}>
			<div>
				<button onClick={() => musicPlayer.current.startMusic()}>Play</button>
				<button onClick={() => musicPlayer.current.pauseMusic()}>Pause</button>
				<button onClick={() => musicPlayer.current.resumeMusic()}>Resume</button>
				<button onClick={() => musicPlayer.current.stopMusic()}>Stop</button>
				<Score combo={scoreData.combo} result={scoreData.result} />
			</div>
			<Canvas 
				id="playCanvas" 
				width={PLAYBOARD_WIDTH} 
				height={PLAYBOARD_HEIGHT} 
				style={canvasStyle} 
				draw={draw}
			/>
		</div>
	)
}