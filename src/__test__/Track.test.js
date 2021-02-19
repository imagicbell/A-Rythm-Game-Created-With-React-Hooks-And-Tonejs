import Track from '../components/Track';
import Drop from '../components/Drop';
import { 
	LIGHT_POS, DROP_SIZE, PLAYBOARD_HEIGHT, NOTE_PREVIEW_TIME,
	SCORE_PERFECT, SCORE_MISS, SCORE_GOOD, SCORE_CRIETERIA
} from '../global/settings';
import { PLAY_TYPE_CLICK, PLAY_TYPE_PRESS } from '../global/notes';

describe("A track is where drops drop from top to bottom, and hit the bottom meeting the rhythm.", () => {
	
	const DROP_HEIGHT = PLAYBOARD_HEIGHT-DROP_SIZE/3.5;
	const DROP_SPEED = DROP_HEIGHT / NOTE_PREVIEW_TIME;
	const TRACK_ID = 0, TRACK_COLOR = "red";
	const track = new Track(TRACK_ID, TRACK_COLOR);

	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	it("Spawn drops of click type correctly", () => {
		let noteInfo = {
			playType: PLAY_TYPE_CLICK,
			duration: 0.1
		};
		track.addDrop(noteInfo.playType, noteInfo.duration);
		expect(track.drops.length).toBe(1);
		expect(track.drops[0]).toBeInstanceOf(Drop);
		expect(track.drops[0]).toMatchObject({
			type: PLAY_TYPE_CLICK,
			x: LIGHT_POS[TRACK_ID],
			y: 0,
			radius: DROP_SIZE,
			length: 0,
			speed: DROP_SPEED,
			color: TRACK_COLOR
		});
	});

	it("Spawn drops of press type correctly", () => {
		let noteInfo = {
			playType: PLAY_TYPE_PRESS,
			duration: 0.1
		};
		track.addDrop(noteInfo.playType, noteInfo.duration);
		expect(track.drops.length).toBe(2);
		expect(track.drops[1]).toBeInstanceOf(Drop);
		expect(track.drops[1]).toMatchObject({
			type: PLAY_TYPE_PRESS,
			x: LIGHT_POS[TRACK_ID],
			y: 0,
			radius: DROP_SIZE,
			length: 0.1*DROP_SPEED,
			speed: DROP_SPEED,
			color: TRACK_COLOR
		});
	});

	it("Drops drop in a fixed time.", () => {
		let drop = track.drops[0];
		drop.update(NOTE_PREVIEW_TIME);
		expect(drop.y).toBeCloseTo(DROP_HEIGHT, 2);
	});

	it("user click should be checked correctly.", () => {
		track.onClickResult = result => {
			expect(result).toBe(SCORE_PERFECT);
		}
		track.onPressLight();
		track.onReleaseLight();
	});

	it("drop should die when drop out of screen.", () => {
		track.drops[0].update(1);
		track.checkDropDie();
		expect(track.drops.length).toBe(1);
	})

	it("user press should be checked correctly.", () => {
		track.onClickResult = result => {
			expect(result).toBe(SCORE_GOOD);
		};
		
		let drop = track.drops[0];
		drop.update(NOTE_PREVIEW_TIME - (SCORE_CRIETERIA[SCORE_GOOD] - 0.1) / drop.speed);
		track.onPressLight();

		track.onClickResult = result => {
			expect(result).toBe(SCORE_MISS);
		};
		drop.update(0.5);
		track.onReleaseLight();
	})
});