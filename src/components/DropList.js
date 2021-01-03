import Drop from "./Drop";
import { DROP_SIZE, NOTE_PREVIEW_TIME, PLAYBOARD_HEIGHT } from '../global/settings';

const DROP_HEIGHT = PLAYBOARD_HEIGHT-DROP_SIZE/3.5;
const DROP_SPEED = DROP_HEIGHT / NOTE_PREVIEW_TIME;

export default class DropList {
	drops: Array<Drop> = [];
	nextId: Number = 0;

	addDrop(x, y, color) {
		this.drops.push(new Drop({
			id: this.nextId,
			x,
			y,
			speed: DROP_SPEED,
			size: DROP_SIZE,
			color
		}));
		this.nextId++;
	}

	removeDrop(dropId) {
		let index = this.drops.findIndex(drop => drop.id === dropId);
		this.drops.splice(index, 1);
	}

	draw(context, deltaTime) {
		this.drops.forEach(drop => drop.update(deltaTime));
		//remove died drops
		this.drops = this.drops.filter(drop => drop.y < DROP_HEIGHT);
		this.drops.forEach(drop => drop.draw(context));
	}
}