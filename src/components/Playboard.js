import DropField from '../containers/DropField';
import MusicPlayer from '../containers/MusicPlayer';
import LightList from '../containers/LightList';

const wrapStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	padding: "10px"
}

const svgStyle = {
	border: "1px solid black",
}

export default function Playboard({ addDrop }) {
	return (
		<div style={wrapStyle}>
			<MusicPlayer />
			<svg id="playboard" width="540" height="720" style={svgStyle}>
				<DropField />
				<LightList />
			</svg>
		</div>
	)
}