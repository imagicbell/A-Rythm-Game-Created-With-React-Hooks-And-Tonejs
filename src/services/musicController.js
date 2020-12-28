import * as Tone from 'tone';
import { loadMidiFromUrl } from './midiLoader';

const MUSICSTATE = {
  START: "started",
  STOP: "stopped",
  PAUSE: "paused"
}

export default class musicController {
	player: Tone.Player = null;
	musicLoaded: Boolean = false;
	musicState: String = MUSICSTATE.STOP;

	loadMusic(musicName: String) {
		const url = process.env.PUBLIC_URL + `/midiFiles/${musicName}`;
		this.player = new Tone.Player(`${url}.mp3`).toDestination();
		Promise.all([
			Tone.loaded(),
			loadMidiFromUrl(`${url}.mid`)
		]).then(([_, midi]) => {
			this.musicLoaded = true;
			this.scheduleTimeline(midi);
		});
	}

	startMusic() {
		if (!this.musicLoaded) {
			throw new Error("Music can't be started before it is loaded!")
		}

		this.musicState = MUSICSTATE.START;
		this.player.start();
		Tone.Transport.start();
	}

	stopMusic() {
		this.musicState = MUSICSTATE.STOP;
		this.player.stop();
		Tone.Transport.stop();
	}

	pauseMusic() {
		this.musicState = MUSICSTATE.PAUSE;
		this.player.stop();
		Tone.Transport.pause();
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
					this.activeLight(noteIndex % 5);
				}, time);
			}, note.time);
			Tone.Transport.schedule(time => {
				Tone.Draw.schedule(() => {
					this.deactiveLight(noteIndex % 5);
				}, time);
			}, note.time+note.duration);
		});
	
		Tone.Transport.schedule(time => {
			console.log("midiplayer: finish play");
			this.stopMusic();
		}, midi.duration);
	}
}