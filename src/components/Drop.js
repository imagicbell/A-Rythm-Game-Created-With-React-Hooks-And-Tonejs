export default class Drop {
	constructor({id, x, y, speed, size, color}) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.size = size;
		this.color = color;
	}

	update(deltaTime) {
		this.y += deltaTime * this.speed;
	}

	draw(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		context.fill();
	}
}