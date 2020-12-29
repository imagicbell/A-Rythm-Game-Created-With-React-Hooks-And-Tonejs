import { connect } from 'react-redux';
import { Component } from 'react';
import { LIGHT_COLORS } from '../global/constants';
import Light from '../components/Light';
import './LightList.css';

class LightList extends Component {
	constructor(props) {
		super(props);
		this.lightColors = LIGHT_COLORS[Math.floor(Math.random() * LIGHT_COLORS.length)];
	}

	render() {
		const { lightStates } = this.props;
		return (
			<div className="lightlist">
				{
					this.lightColors.map((color, index) => (
						<Light key={index} index={index} color={color} state={lightStates[index] ? "active" : "normal"} />
					))
				}
			</div>
		)
	}
}

export default connect(state => ({
	lightStates: state.lights.activeStates
}))(LightList);