export default function Light({x, y, radius, color, state}) {
	const fillColor = color + (state === "active" ? "ff" : "55");
	const style = state === "active" ? {
		stroke: "#fef5c7",
		strokeWidth: "8"
	} : {};

	return (
		<circle
			cx={x}
			cy={y}
			r={radius}
			fill={color + "55"}
			// style={style}
		/>
	)
}