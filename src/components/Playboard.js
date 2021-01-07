import { useRef, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import MusicPlayer from '../services/MusicPlayer';
import Track from './Track';
import Score from './Score';
import Canvas from './Canvas';
import Controller from './Controller';
import { 
	PLAYBOARD_WIDTH, PLAYBOARD_HEIGHT, LIGHT_COLORS, KEY_MAP,
	SCORE_PERFECT, SCORE_GOOD, SCORE_MISS
} from "../global/settings";
import "./Playboard.css";

const initPlayData = {
	state: "STOP",
	useLeft: true,
	useRight: true,
}

export default function Playboard() {
	const [scoreData, setScoreData] = useState({ combo: 0, result: "" });
	const playData = useRef(initPlayData);
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
			if ((noteInfo.trackId === 0 && playData.current.useRight) || 
					(noteInfo.trackId === 1 && playData.current.useLeft)) {
						trackList.current[noteInfo.lightId].addDrop(noteInfo.playType, noteInfo.duration);
					}
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
		trackList.current.forEach(track => track.draw(ctx, playData.current.state === "PLAY" ? deltaTime : 0));
	}

	const changePlayState = state => {
		switch (state) {
			case "PLAY":
				if (playData.current.state === "STOP") {
					musicPlayer.current.startMusic();
				} else {
					musicPlayer.current.resumeMusic();
				}
				break;
			case "PAUSE":
				musicPlayer.current.pauseMusic();
				break;
			case "STOP":
				musicPlayer.current.stopMusic();
				break;
			default:
				break;
		}
		playData.current.state = state;
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
		<div className="playboard">
			<div className="header">
				<Controller 
					onPlay={() => changePlayState("PLAY")}
					onStop={() => changePlayState("STOP")}
					onPause={() => changePlayState("PAUSE")}
					onResume={() => changePlayState("PLAY")}
					onUseLeft={useLeft => playData.current.useLeft = useLeft}
					onUseRight={useRight => playData.current.useRight = useRight}
				/>
				<Score combo={scoreData.combo} result={scoreData.result} />
			</div>
			<Canvas 
				id="playCanvas" 
				width={PLAYBOARD_WIDTH} 
				height={PLAYBOARD_HEIGHT} 
				draw={draw}
			/>
		</div>
	)
}