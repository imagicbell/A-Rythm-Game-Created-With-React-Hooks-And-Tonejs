export default function Drop({x, y, radius, color}) {
	return (
		<circle
			cx={x}
			cy={y}
			r={radius}
			fill={color}
		/>
	)
}