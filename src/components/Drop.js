import { PLAY_TYPE_PRESS } from "../global/notes";

export default class Drop {
	constructor({type, x, y, radius, length, speed, color}) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.length = length;
		this.speed = speed;
		this.color = color;

		this.state = "";
	}

	get endY() {
		return this.y - this.length;
	}

	get completed() {
		return (this.type === PLAY_TYPE_PRESS && this.state === "released") || this.state !== "";
	}

	onPress() {
		if (this.state === "") {
			this.state = "pressed";
		}
	}

	onRelease() {
		if (this.state === "pressed") {
			this.state = "released";
		}
	}

	update(deltaTime) {
		this.y += deltaTime * this.speed;
	}

	draw(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.fill();

		if (this.type === PLAY_TYPE_PRESS) {
			context.fillRect(this.x - this.radius, this.endY, this.radius*2, this.length);

			context.beginPath();
			context.arc(this.x, this.endY, this.radius, 0, 2 * Math.PI);
			context.fill();
		}
	}
}