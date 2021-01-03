import { LIGHT_COLORS, LIGHT_NUM, LIGHT_POS, LIGHT_SIZE, PLAYBOARD_HEIGHT } from '../global/settings';
import Light from './Light';

export default class LightList {
	lights: Array<Light> = [];

	constructor() {
		const colors = LIGHT_COLORS[Math.floor(Math.random() * LIGHT_COLORS.length)];
		this.lights = Array(LIGHT_NUM).fill().map((_, index) => new Light({
			x: LIGHT_POS[index],
			y: PLAYBOARD_HEIGHT,
			size: LIGHT_SIZE,
			color: colors[index],
		}));
	}

	lightColor(lightId) {
		return this.lights[lightId].color;
	}

	activeLight(lightId) {
		this.lights[lightId].active();
	}

	deactiveLight(lightId) {
		this.lights[lightId].deactive();
	}

	draw(context, deltaTime) {
		this.lights.forEach(light => light.draw(context));
	}
}