import './Light.css'

function Light({ index, color, state }) {
	let className = "light";
	if (state === "active") {
		className += " active";
	}

	return (
		<div className={className} style={{backgroundColor: `${color}`}}>
		</div>
	)
}

export default Light;