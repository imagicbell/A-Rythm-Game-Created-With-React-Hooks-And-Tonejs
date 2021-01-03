import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import MusicController from "../services/musicController";
import { addDrop } from '../store/actions/drops';
import { activeLight, deactiveLight } from "../store/actions/lights";
import { LIGHT_POS } from '../global/settings';

function MusicPlayer(props) {
	const musicCtrl = useRef();
	const refProps = useRef();
	refProps.current = props;

	useEffect(() => {
		musicCtrl.current = new MusicController();
		musicCtrl.current.loadMusic("Melody-of-the-Night-5");
		musicCtrl.current.onNotePreview = noteInfo => {
			refProps.current.addDrop({
				id: refProps.current.drops.nextId,
				x: LIGHT_POS[noteInfo.lightId],
				y: 0,
				color: refProps.current.lightColors[noteInfo.lightId],
			});
		};
		musicCtrl.current.onNoteBegin = noteInfo => {
			refProps.current.activeLight(noteInfo.lightId);
		};
		musicCtrl.current.onNoteEnd = noteInfo => {
			refProps.current.deactiveLight(noteInfo.lightId);
		};
	}, []);

	return (
		<div>
				<button onClick={() => musicCtrl.current.startMusic()}>Play</button>
				<button onClick={() => musicCtrl.current.pauseMusic()}>Pause</button>
				<button onClick={() => musicCtrl.current.resumeMusic()}>Resume</button>
				<button onClick={() => musicCtrl.current.stopMusic()}>Stop</button>
		</div>
	)
}

export default connect(state => ({
	drops: state.drops,
	lightColors: state.lights.colors,
}), { addDrop, activeLight, deactiveLight })(MusicPlayer);

