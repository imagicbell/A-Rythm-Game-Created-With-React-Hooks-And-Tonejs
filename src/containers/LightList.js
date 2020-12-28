import { connect } from 'react-redux';
import Light from '../components/Light';
import './LightList.css';

const lights = [
	"#fc773e",
	"#3efc77",
	"#773efc",
	"#a3122f",
	"#3ec3fc"
];

function LightList({ lightStates }) {
	return (
		<div className="lightlist">
			{
				lights.map((color, index) => (
					<Light key={index} index={index} color={color} state={lightStates[index] ? "active" : "normal"} />
				))
			}
		</div>
	)
}

export default connect(state => ({
	lightStates: state.lights.activeStates
}))(LightList);