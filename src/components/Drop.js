export default class Drop {
	constructor({type, x, y, radius, length, speed, color}) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.length = length;
		this.speed = speed;
		this.color = color;
	}

	get endY() {
		return this.y - this.length;
	}

	update(deltaTime) {
		this.y += deltaTime * this.speed;
	}

	draw(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.fill();
	}
}