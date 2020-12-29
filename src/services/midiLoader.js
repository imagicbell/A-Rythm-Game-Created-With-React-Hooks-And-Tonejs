import { Midi } from '@tonejs/midi';
import { readFileAsBinary } from '../services/fileReader';
import { editMusic } from './musicEditor';

export async function loadMidiFromUrl(url: String) {
	const midi = await Midi.fromUrl(url);
	prepareMidi(midi);
	// console.log(`read midi file\n ${JSON.stringify(midi, null, "\t")}`);
	console.log("read midi file", midi);

	editMusic(midi);
	return midi;
}

export async function loadMidiFromFile(file: File) {
	const midiData = await readFileAsBinary(file);
	const midi = new Midi(midiData);
	prepareMidi(midi);
	console.log("read midi file", midi);
	return midi;
}

function prepareMidi(midi) {
	midi.header.timeSignatures.forEach(ts => ts.time = midi.header.ticksToSeconds(ts.ticks));
	midi.header.keySignatures.forEach(ks => ks.time = midi.header.ticksToSeconds(ks.ticks));
}