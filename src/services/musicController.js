import * as Tone from 'tone';
import { loadMidiFromUrl } from './midiLoader';
import { type Note } from '../global/types';

export default class musicController {
	musicLoaded: Boolean = false;
	onNoteBegin: (note: Note) => void = null;
	onNoteEnd: (note: Note) => void = null;

	loadMusic(musicName: String) {
		const url = process.env.PUBLIC_URL + `/midiFiles/${musicName}`;
		const player = new Tone.Player(`${url}.mp3`).toDestination();
		Promise.all([
			Tone.loaded(),
			loadMidiFromUrl(`${url}.mid`),
		]).then(([_, midi]) => {
			this.musicLoaded = true;
			player.sync().start(0);	//Sync the source to the Transport
			this.scheduleTimeline(midi);
		});
	}

	get musicState() {
		return Tone.Transport.state;
	}

	startMusic() {
		if (!this.musicLoaded) {
			throw new Error("Music can't be started before it is loaded!")
		}

		Tone.start();
		Tone.Transport.start();
	}

	stopMusic() {
		Tone.Transport.stop();
	}

	pauseMusic() {
		Tone.Transport.pause();
	}

	resumeMusic() {
		Tone.Transport.start();
	}

	scheduleTimeline(midi) {
		Tone.Transport.bpm.value = 120;
		midi.header.tempos.forEach((tempo, tempoIndex) => {
			if (tempoIndex === 0) {
				Tone.Transport.bpm.value = tempo.bpm;
			} else {
				Tone.Transport.schedule(time => {
					Tone.Transport.bpm.value = tempo.bpm;
				}, tempo.time);
			}
		});
	
		midi.header.timeSignatures.forEach((ts, tsIndex) => {
			if (tsIndex === 0) {
				Tone.Transport.timeSignature = [ts.beats, ts.beatType];
			} else {
				Tone.Transport.schedule(time => {
					Tone.Transport.timeSignature = [ts.beats, ts.beatType];
				}, ts.time);
			}
		});
	
		//todo: read event from midi json data
		midi.tracks[0].notes.forEach((note, noteIndex) => {
			Tone.Transport.schedule(time => {
				Tone.Draw.schedule(() => {
					if (this.onNoteBegin) {
						this.onNoteBegin({
							midi: note.midi,
							index: noteIndex,
							track: 
						});
					}
				}, time);
			}, note.time);
			Tone.Transport.schedule(time => {
				Tone.Draw.schedule(() => {
					if (this.onNoteEnd) {
						this.onNoteEnd({
							midi: note.midi,
							duration: note.duration,
							index: noteIndex
						});
					}
				}, time);
			}, note.time+note.duration);
		});
	
		Tone.Transport.schedule(time => {
			console.log("midiplayer: finish play");
			this.stopMusic();
		}, midi.duration);
	}
}