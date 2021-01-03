export default class Light {
	constructor({ x, y, size, color }) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.state = "normal";
	}

	active() {
		this.state = "active";
	}

	deactive() {
		this.state = "normal";
	}

	draw(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		context.fill();

		if (this.state === "active")
			context.stroke();
	}
}