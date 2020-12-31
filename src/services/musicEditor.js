import { LIGHT_NUM, CLICK_THRESHOLD } from '../global/settings';
import { notes, PLAY_TYPE_CLICK, PLAY_TYPE_PRESS } from '../global/notes';

export function editMusic(midi) {
	midi.tracks.forEach((track, trackIndex) => {
		const lightIdOffset = trackIndex % 2 === 0 ? LIGHT_NUM / 2 : 0;
		track.notes.forEach(note => {
			let lightId = lightIdOffset + notes.find(n => n.midi === note.midi).lightId;
			note.playInfo = {
				lightId,
				playType: note.duration > CLICK_THRESHOLD ? PLAY_TYPE_PRESS : PLAY_TYPE_CLICK
			};
		});
	});

	console.log("edit music file", midi);
}