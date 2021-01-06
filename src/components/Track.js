import Drop from "./Drop";
import Light from "./Light";
import { 
	LIGHT_POS, LIGHT_SIZE, 
	PLAYBOARD_HEIGHT, DROP_SIZE, NOTE_PREVIEW_TIME,
	SCORE_PERFECT, SCORE_GOOD, SCORE_MISS, SCORE_CRIETERIA 
} from '../global/settings';
import { PLAY_TYPE_PRESS } from "../global/notes";

const DROP_HEIGHT = PLAYBOARD_HEIGHT-DROP_SIZE/3.5;
const DROP_SPEED = DROP_HEIGHT / NOTE_PREVIEW_TIME;

export default class Track {
	id: Number;
	light: Light;
	drops: Array<Drop>;
	pressedDrop: Drop = null;
	onClickResult: () => String;

	constructor(id, color) {
		this.id = id;
		this.light = new Light({
			x: LIGHT_POS[id],
			y: PLAYBOARD_HEIGHT,
			size: LIGHT_SIZE,
			color,
		});
		this.drops = [];
	}

	addDrop(type, duration) {
		this.drops.push(new Drop({
			type,
			x: this.light.x,
			y: 0,
			radius: DROP_SIZE,
			length: type === PLAY_TYPE_PRESS ? duration*DROP_SPEED : 0,
			speed: DROP_SPEED,
			color: this.light.color
		}));
	}

	activeLight() {
		this.light.active();
	}

	deactiveLight() {
		this.light.deactive();
	}

	onPressLight() {
		if (this.pressedDrop) {
			return;
		}
		if (this.drops.length === 0) {
			return;
		}

		this.pressedDrop = this.drops[0];
		let distance = DROP_HEIGHT - this.pressedDrop.y;
		this.decideResult(distance);
		this.activeLight();
	}

	onReleaseLight() {
		if (!this.pressedDrop) {
			return;
		}

		if (this.pressedDrop.type === PLAY_TYPE_PRESS) {
			let distance = DROP_HEIGHT - this.pressedDrop.endY;
			this.decideResult(distance);
		}

		this.deactiveLight();
		this.pressedDrop = null;
	}

	decideResult(distance) {
		let result;
		distance = Math.abs(distance);
		if (distance < SCORE_CRIETERIA[SCORE_PERFECT]) {
			result = SCORE_PERFECT;
		} else if (distance < SCORE_CRIETERIA[SCORE_GOOD]) {
			result = SCORE_GOOD;
		} else {
			result = SCORE_MISS;
		}
		this.onClickResult(result);
		console.log(distance, result);
	}

	draw(context, deltaTime) {
		this.light.draw(context);
		this.drops.forEach(drop => {
			drop.update(deltaTime);
			if (drop.y < DROP_HEIGHT) {
				drop.draw(context);
			}
		});
		if (this.drops.length > 0 && this.drops[0].y > DROP_HEIGHT + SCORE_CRIETERIA[SCORE_GOOD]) {
			this.drops.shift();
		}
	}
}