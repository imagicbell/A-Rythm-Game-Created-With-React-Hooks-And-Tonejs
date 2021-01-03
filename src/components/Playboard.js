import Canvas from './Canvas';
import { PLAYBOARD_WIDTH, PLAYBOARD_HEIGHT, LIGHT_POS } from "../global/settings";
import { useRef, useEffect } from 'react';
import MusicPlayer from '../services/MusicPlayer';
import LightList from './LightList';
import DropList from './DropList';

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
	const musicPlayer = useRef(null);
	const lightList = useRef(null);
	const dropList = useRef(null);
	
	//initialize
	useEffect(() => {
		lightList.current = new LightList();
		dropList.current = new DropList();

		musicPlayer.current = new MusicPlayer();
		musicPlayer.current.loadMusic("Melody-of-the-Night-5");
		musicPlayer.current.onNotePreview = noteInfo => {
			dropList.current.addDrop(LIGHT_POS[noteInfo.lightId], 0, lightList.current.lightColor(noteInfo.lightId));
		};
		musicPlayer.current.onNoteBegin = noteInfo => {
			lightList.current.activeLight(noteInfo.lightId);
		};
		musicPlayer.current.onNoteEnd = noteInfo => {
			lightList.current.deactiveLight(noteInfo.lightId);
		};
	}, []);

	const draw = (ctx, deltaTime) => {
		lightList.current.draw(ctx, deltaTime);
		dropList.current.draw(ctx, deltaTime);
	}

	return (
		<div style={wrapStyle}>
			<div>
				<button onClick={() => musicPlayer.current.startMusic()}>Play</button>
				<button onClick={() => musicPlayer.current.pauseMusic()}>Pause</button>
				<button onClick={() => musicPlayer.current.resumeMusic()}>Resume</button>
				<button onClick={() => musicPlayer.current.stopMusic()}>Stop</button>
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